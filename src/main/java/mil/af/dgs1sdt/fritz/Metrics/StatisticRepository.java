package mil.af.dgs1sdt.fritz.Metrics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatisticRepository extends JpaRepository<Statistic, Long> {
  Statistic findByUid(String uid);
}
