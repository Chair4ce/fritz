package mil.af.dgs1sdt.fritz.Interfaces;

import mil.af.dgs1sdt.fritz.Models.UnicornUploadStatusModel;
import org.apache.http.NameValuePair;
import org.w3c.dom.Document;

import java.io.File;
import java.io.IOException;
import java.util.List;

public interface UnicornClient {
  Document getMissions() throws Exception;

  Document getCallouts(String missionId) throws Exception;

  Document getReleasabilities() throws Exception;

  Document makeRequest(String uri) throws Exception;

  UnicornUploadStatusModel makePostRequest(String uri, List<NameValuePair> params) throws Exception;

  int checkUnicornStatus() throws Exception;

  String convertFileToBase64(File file) throws IOException;
}
