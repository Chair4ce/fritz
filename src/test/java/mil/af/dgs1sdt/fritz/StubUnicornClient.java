package mil.af.dgs1sdt.fritz;

import mil.af.dgs1sdt.fritz.Interfaces.UnicornClient;
import mil.af.dgs1sdt.fritz.Models.UnicornUploadStatusModel;
import org.apache.http.NameValuePair;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@ActiveProfiles("test")
@Primary
public class StubUnicornClient implements UnicornClient {
  @Override
  public Document getMissions() throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder = dbf.newDocumentBuilder();
    Document doc = builder.newDocument();

    Element root = doc.createElement("root");
    doc.appendChild(root);

    for (int i = 1; i < 4; i++) {
      Element mission = doc.createElement("missionMetaData");
      root.appendChild(mission);
      appendElementWithChild(doc, mission, "missionid", "id" + i);
      appendElementWithChild(doc, mission, "callsign", "callsign" + i);
      appendElementWithChild(doc, mission, "description", "descr" + i);
      appendElementWithChild(doc, mission, "missionStatus", "status" + i);
      appendElementWithChild(doc, mission, "startdttime", "startTime" + i);
      appendElementWithChild(doc, mission, "primaryorg", "org" + i);
      appendElementWithChild(doc, mission, "platform", "platform" + i);
    }
    return doc;
  }

  @Override
  public Document getCallouts(String missionId) throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder = dbf.newDocumentBuilder();
    Document doc = builder.newDocument();

    Element root = doc.createElement("root");
    doc.appendChild(root);

    for (int i = 1; i < 4; i++) {
      Element target = doc.createElement("target");
      root.appendChild(target);
      appendElementWithChild(doc, target, "targetName", "callout" + i);
      appendElementWithChild(doc, target, "classification", "classified");
      appendElementWithChild(doc, target, "releasability", "rel");
      appendElementWithChild(doc, target, "targetActivity", "act" + i);
      appendElementWithChild(doc, target, "targetEventID", "event" + i);
      appendElementWithChild(doc, target, "tot", "2019-04-29 13:0" + i + ":00.0");
    }
    return doc;
  }

  private void appendElementWithChild(Document doc, Node element, String childName, String childValue) {
    Element child = doc.createElement(childName);
    child.appendChild(doc.createTextNode(childValue));
    element.appendChild(child);
  }

  @Override
  public Document getReleasabilities() throws Exception {
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder = dbf.newDocumentBuilder();
    Document doc = builder.newDocument();

    Element root = doc.createElement("root");
    doc.appendChild(root);

    for (int i = 1; i < 4; i++) {
      Element target = doc.createElement("RELEASABILITY");
      root.appendChild(target);
      appendElementWithChild(doc, target, "RELEASABILITY_ID", "releasId" + i);
      appendElementWithChild(doc, target, "RELEASABILITY_NAME_TXT", "releasName" + i);
    }
    return doc;
  }

  @Override
  public Document makeRequest(String uri) throws Exception {
    return null;
  }

  @Override
  public UnicornUploadStatusModel makePostRequest(String uri, List<NameValuePair> params) throws Exception {
    return null;
  }

  @Override
  public int checkUnicornStatus() throws Exception {
    return 0;
  }

  @Override
  public String convertFileToBase64(File file) throws IOException {
    return null;
  }
}
