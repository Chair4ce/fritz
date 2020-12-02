package mil.af.dgs1sdt.fritz;

import mil.af.dgs1sdt.fritz.Models.TrackingModel;
import mil.af.dgs1sdt.fritz.Stores.TrackingStore;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.springframework.scheduling.annotation.Async;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Conversion {

  @Async
  public void convertPDF(String filename, String hash) throws IOException {

    TrackingModel tracking = TrackingStore.getTrackingList().stream()
      .filter(tm -> hash.equals(tm.getHash()))
      .findAny()
      .orElse(new TrackingModel());

    File file = new File("/tmp/working/" + hash + "/" + filename);
    String outdir = "/tmp/complete/" + hash + "/";

    File out = new File(outdir);
    if (!out.exists())
      out.mkdirs();

    try (final PDDocument document = PDDocument.load(file)) {
      String pattern = "\\/ [0-9]{4}Z";
      tracking.setTimes(new String[document.getNumberOfPages()]);
      tracking.setTotalSlides(document.getNumberOfPages());
      PDFRenderer pdfRenderer = new PDFRenderer(document);
      for (int page = 0; page < document.getNumberOfPages(); page++) {
        PDFTextStripper stripper = new PDFTextStripper();
        stripper.setStartPage(page + 1);
        stripper.setEndPage(page + 1);
        String text = stripper.getText(document);
        if (page == 0) {
          String date = this.getDateFromText(text);
          if (date != "") {
            tracking.setDate(date);
          }
          String opPattern = "OP NAME: .*";
          Matcher opMatcher = Pattern.compile(opPattern).matcher(text);
          if (opMatcher.find()) {
            tracking.setOp(opMatcher.group().replace("OP NAME: ", "").trim());
          }
          String callsignPattern = "CALLSIGN: [A-z]+ [0-9]{2}";
          Matcher callsignMatcher = Pattern.compile(callsignPattern).matcher(text);
          if (callsignMatcher.find()) {
            tracking.setCallsign(callsignMatcher.group().replace("CALLSIGN: ", ""));
          }
          String releasabilityPattern = "\\/\\/[A-z ,]+";
          Matcher releasabilityMatcher = Pattern.compile(releasabilityPattern).matcher(text);
          if (releasabilityMatcher.find()) {
            tracking.setReleasability(releasabilityMatcher.group().replace("//", "").trim());
          }
        }
        Matcher m = Pattern.compile(pattern).matcher(text);
        if (m.find()) {
          String[] times = tracking.getTimes();
          times[page] = (m.group().replace("Z", "").replace("/ ", ""));
          tracking.setTimes(times);
        } else {
          Matcher time = Pattern.compile("[0-9]{4}Z").matcher(text);
          if (time.find()) {
            String[] times = tracking.getTimes();
            times[page] = (time.group().replace("Z", ""));
            tracking.setTimes(times);
          }
        }
        BufferedImage bim = pdfRenderer.renderImageWithDPI(page, 300, ImageType.RGB);
        String fileName = outdir + "image-" + page + ".jpg";
        ImageIOUtil.writeImage(bim, fileName, 300);
        tracking.setCompletedSlides(tracking.getCompletedSlides() + 1);
      }
      document.close();
    } catch (IOException e) {
      System.err.println("Exception while trying to create pdf document - " + e);
    }
  }

  public String getDateFromText(String text) {
    String datePattern = "\\d{2} [A-z]{3} \\d{2}";
    Matcher dateMatcher = Pattern.compile(datePattern).matcher(text);
    if (dateMatcher.find()) {
      return dateMatcher.group().replaceAll(" ", "");
    }
    return "";
  }

  public long convertDateStringToUnix(String date) throws Exception {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddMMMyy");
    simpleDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
    Date newDate = simpleDateFormat.parse(date);
    return newDate.getTime() / 1000L;
  }
}

