import { RenameRepository } from './RenameRepository';

export class StubRenameRepository implements RenameRepository {
  rename(data: any): Promise<void> {
    return Promise.resolve();
  }
}