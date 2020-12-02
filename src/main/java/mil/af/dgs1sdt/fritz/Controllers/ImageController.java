package mil.af.dgs1sdt.fritz.Controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.*;

@Controller
@RequestMapping(ImageController.URI)
public class ImageController {

  public static final String URI = "/api/image";

  @GetMapping(path = "/**/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
  public void getImage(
    @CookieValue("id") String id,
    @PathVariable String imageId, HttpServletResponse response
  ) throws IOException {
    File img = new File("/tmp/complete/" + id + "/" + imageId.replace(".jpg", "") + ".jpg");

    InputStream is = new FileInputStream(img);
    response.setContentType(MediaType.IMAGE_JPEG_VALUE);
    StreamUtils.copy(is, response.getOutputStream());
  }
}
