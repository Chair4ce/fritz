package mil.af.dgs1sdt.fritz;

import mil.af.dgs1sdt.fritz.Models.CalloutModel;
import mil.af.dgs1sdt.fritz.Models.MissionModel;
import mil.af.dgs1sdt.fritz.Models.ReleasabilityModel;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class UnicornService {
  public List<MissionModel> getMissions(Document document) throws Exception {
    List<MissionModel> missionList = new ArrayList<>();
    NodeList htmlMissions = document.getElementsByTagName("missionMetaData");
    for (int i = 0; i < htmlMissions.getLength(); i++) {
      Node element = htmlMissions.item(i);
      if (element.getNodeType() == Node.ELEMENT_NODE) {
        Element ele = (Element) element;
        MissionModel mission = new MissionModel(
          ele.getElementsByTagName("missionid").item(0).getTextContent(),
          ele.getElementsByTagName("callsign").item(0).getTextContent(),
          ele.getElementsByTagName("description").item(0).getTextContent(),
          ele.getElementsByTagName("missionStatus").item(0).getTextContent(),
          ele.getElementsByTagName("startdttime").item(0).getTextContent(),
          ele.getElementsByTagName("primaryorg").item(0).getTextContent().replace('-', ' '),
          ele.getElementsByTagName("platform").item(0).getTextContent()
        );
        missionList.add(mission);
      }
    }
    return missionList;
  }

  public List<CalloutModel> getCallouts(Document document) throws Exception {
    List<CalloutModel> targets = new ArrayList<>();
    NodeList t = document.getElementsByTagName("target");
    for (int i = 0; i < t.getLength(); i++) {
      Node element = t.item(i);
      if (element.getNodeType() == Node.ELEMENT_NODE) {
        Element ele = (Element) element;
        CalloutModel target = new CalloutModel();
        target.setName(ele.getElementsByTagName("targetName").item(0).getTextContent());
        target.setClassification(ele.getElementsByTagName("classification").item(0).getTextContent());
        target.setReleasability(ele.getElementsByTagName("releasability").item(0).getTextContent());
        target.setActivity(ele.getElementsByTagName("targetActivity").item(0).getTextContent());
        target.setEventId(ele.getElementsByTagName("targetEventID").item(0).getTextContent());
        target.setTot(
          convertDateStringToUnix(
            ele.getElementsByTagName("tot").item(0).getTextContent()
          )
        );
        targets.add(target);
      }
    }
    return targets;
  }

  public List<ReleasabilityModel> getReleasabilities(Document document) {
    List<ReleasabilityModel> releasabilities = new ArrayList<>();
    NodeList r = document.getElementsByTagName("RELEASABILITY");
    for (int i = 0; i < r.getLength(); i++) {
      Node element = r.item(i);
      if (element.getNodeType() == Node.ELEMENT_NODE) {
        Element ele = (Element) element;
        ReleasabilityModel releasability = new ReleasabilityModel(
          ele.getElementsByTagName("RELEASABILITY_ID").item(0).getTextContent(),
          ele.getElementsByTagName("RELEASABILITY_NAME_TXT").item(0).getTextContent(),
          0L
        );
        releasabilities.add(releasability);
      }
    }
    return releasabilities;
  }

  public long convertDateStringToUnix(String date) throws Exception {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    simpleDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
    Date newDate = simpleDateFormat.parse(date);
    return newDate.getTime() / 1000L;
  }

}
