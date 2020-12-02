import { MetricRepository } from './MetricRepository';
import { MetricModel, MetricType } from '../MetricModel';
import * as moment from 'moment';

export class StubMetricRepository implements MetricRepository {

  findAll(): Promise<MetricModel[]> {
    return Promise.resolve([
      new MetricModel(
        '1',
        'e223sdfs23523sdfs1',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs2',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs3',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs3',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs3',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs3',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs3',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs3',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs3',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs3',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs3',
        'Upload',
        moment().unix().toString(),
        (moment().unix() + 10000).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs4',
        'Upload',
        moment().unix().toString(),
        (moment().unix()).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs1',
        'Download',
        moment().unix().toString(),
        (moment().unix() + 10).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs1',
        'Download',
        moment().unix().toString(),
        (moment().unix() + 10).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs1',
        'Download',
        moment().unix().toString(),
        (moment().unix() + 10).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs1',
        'Download',
        moment().unix().toString(),
        (moment().unix() + 10).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs1',
        'Download',
        moment().unix().toString(),
        (moment().unix() + 10).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs1',
        'Download',
        moment().unix().toString(),
        (moment().unix() + 10).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs1',
        'Download',
        moment().unix().toString(),
        (moment().unix() + 10).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs1',
        'Download',
        moment().unix().toString(),
        (moment().unix() + 10).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs1',
        'Download',
        moment().unix().toString(),
        (moment().unix() + 10000).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs2',
        'Download',
        (moment().unix() - 7).toString(),
        (moment().unix() + 15).toString(),
        null
      ),
      new MetricModel(
        '1',
        'ee223sdfs23523sdfs3',
        'Download',
        (moment().unix() - 100).toString(),
        (moment().unix() + 15).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs4',
        'Download',
        (moment().unix() - 10).toString(),
        (moment().unix() + 15).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs12',
        'Renaming',
        moment().unix().toString(),
        (moment().unix() + 6).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs13',
        'Renaming',
        moment().unix().toString(),
        (moment().unix() + 8).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs14',
        'Renaming',
        moment().unix().toString(),
        (moment().unix() + 1).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs14',
        'Renaming',
        moment().unix().toString(),
        (moment().unix() + 10000).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs16',
        'Renaming',
        moment().unix().toString(),
        (moment().unix() + 9).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs',
        'Renaming',
        moment().unix().toString(),
        (moment().unix() + 6).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs',
        MetricType.UNICORN_UPLOAD_FAILURE,
        moment().unix().toString(),
        null,
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs',
        MetricType.UNICORN_UPLOAD_FAILURE,
        moment().unix().toString(),
        null,
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs',
        MetricType.UNICORN_UPLOAD_FAILURE,
        moment().unix().toString(),
        null,
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs',
        MetricType.UNICORN_UPLOAD_SUCCESS,
        moment().unix().toString(),
        null,
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs',
        MetricType.UNICORN_UPLOAD_SUCCESS,
        moment().unix().toString(),
        null,
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs34252',
        'Conversion',
        moment().unix().toString(),
        (moment().unix() + 5).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs314634',
        'Conversion',
        moment().unix().toString(),
        (moment().unix() + 3).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs21435536',
        'Conversion',
        moment().unix().toString(),
        (moment().unix() + 56).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs231434165',
        'Conversion',
        moment().unix().toString(),
        (moment().unix() + 8).toString(),
        null
      ),
      new MetricModel(
        '1',
        'e223sdfs23523sdfs3146542',
        'Conversion',
        moment().unix().toString(),
        (moment().unix() + 100).toString(),
        null
      )
    ]);
  }

  create(metric: MetricModel) {
    return Promise.resolve(new MetricModel(3, 'testetstestes', 'Upload', moment().unix().toString(), null, null));
  }

  update(metric: MetricModel) {
    return Promise.resolve(new MetricModel(
      3,
      'testetstestes',
      'Upload',
      moment().unix().toString(),
      moment().unix().toString(),
      null)
    );
  }
}