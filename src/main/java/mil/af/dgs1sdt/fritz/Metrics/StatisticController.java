package mil.af.dgs1sdt.fritz.Metrics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping(StatisticController.URI)
public class StatisticController {
  public static final String URI = "/api/statistics";

  @Autowired
  StatisticRepository statisticRepository;

  @GetMapping
  public @ResponseBody Iterable<Statistic> getAll() { return statisticRepository.findAll(); }

  @PostMapping
  public @ResponseBody Statistic createOrUpdate(@Valid @RequestBody StatisticJSON statisticJSON) {
    Statistic statistic = this.statisticRepository.findByUid(statisticJSON.getUid());
    if (statistic != null) {
      statistic.setTimesUsed(statistic.getTimesUsed() + 1);
    } else {
      statistic = new Statistic();
      statistic.setUid(statisticJSON.getUid());
      statistic.setTimesUsed(1L);
    }
    return this.statisticRepository.save(statistic);
  }
}
