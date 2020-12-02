package mil.af.dgs1sdt.fritz.Metrics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping(MetricController.URI)
public class MetricController {
  public static final String URI = "/api/metrics";

  @Autowired
  MetricRepository metricRepository;

  @GetMapping
  public @ResponseBody
  Iterable<Metric> getAll() {
    return metricRepository.findAll();
  }

  @PostMapping
  public @ResponseBody
  Metric create(@Valid @RequestBody MetricJSON metricJSON) {
    Metric metric = new Metric(
      metricJSON.getUid(),
      metricJSON.getAction(),
      metricJSON.getStartTime(),
      metricJSON.getEndTime(),
      metricJSON.getCount()
    );
    return this.metricRepository.save(metric);
  }

  @PutMapping
  public @ResponseBody
  Metric update(@Valid @RequestBody MetricJSON metricJSON) {
    return metricRepository.save(new Metric().update(metricJSON));
  }
}
