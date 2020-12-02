package mil.af.dgs1sdt.fritz.Interfaces;

import mil.af.dgs1sdt.fritz.Models.MissionModel;
import mil.af.dgs1sdt.fritz.Models.UnicornUploadStatusModel;
import org.apache.commons.io.FileUtils;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Service
@ActiveProfiles("prod")
public class WebUnicornClient implements UnicornClient {

  private String unicornBaseURL = System.getenv("UNICORN_URL");

  @Override
  public Document getMissions() throws Exception {
    List<MissionModel> missionList = new ArrayList<>();
    SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");

    String now = sdf.format(new Date());
    String yesterday = sdf.format(new Date(System.currentTimeMillis() - (48 * 60 * 60 * 1000)));

    String uri = unicornBaseURL + "/WebServices/UnicornMissionWebServicesV2" +
      ".asmx/GetMissionMetaDataRest?keyword=&start=" + yesterday + "&end=" + now + "&latitude=&longitude=&radius=";
    return this.makeRequest(uri);
  }

  @Override
  public Document getCallouts(String missionId) throws Exception {
    String uri = unicornBaseURL + "/WebServices/PMSServicesReltoNF" +
      ".asmx/GetPMSTargetInfo?ato=&missionID=" + missionId + "&atoDay=";
    Document doc = this.makeRequest(uri);
    return doc;
  }

  @Override
  public Document getReleasabilities() throws Exception {
    String uri = unicornBaseURL + "/WebServices/UnicornData.asmx/GetReleasabilities";
    return this.makeRequest(uri);

  }

  @Override
  public Document makeRequest(String uri) throws Exception {
    URL url = new URL(uri);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");

    InputStream xml = connection.getInputStream();

    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    return db.parse(xml);
  }

  @Override
  public UnicornUploadStatusModel makePostRequest(String uri, List<NameValuePair> params) throws Exception {
    CloseableHttpClient client = HttpClients.createDefault();
    HttpPost httpPost = new HttpPost(uri);
    httpPost.setEntity(new UrlEncodedFormEntity(params));
    CloseableHttpResponse response = client.execute(httpPost);
    String result = EntityUtils.toString(response.getEntity());
    client.close();

    UnicornUploadStatusModel status = new UnicornUploadStatusModel();
    if (result.contains("true") || response.getStatusLine().getStatusCode() == 200)
      status.setSuccessfulUpload(true);
    return status;
  }

  @Override
  public int checkUnicornStatus() throws Exception {
    URL url = new URL(unicornBaseURL);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.connect();

    int code = connection.getResponseCode();
    return code;
  }

  @Override
  public String convertFileToBase64(File file) throws IOException {
    byte[] content = FileUtils.readFileToByteArray(file);
    return Base64.getEncoder().encodeToString(content);
  }
}