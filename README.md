# nsblob

Store blobs on nodesite.eu

```typescript
import nsblob from 'nsblob';

DirMap {
    [filename: string]: string | DirMap;
}

nsblob.store(<Buffer>): Promise<string>;
nsblob.store_file(<path>): Promise<string>;
nsblob.store_dir(<path>): Promise<DirMap>;

nsblob.fetch(<string>): Promise<Buffer>;
nsblob.store_to_path(<string | DirMap>, <path>): Promise<void>;
```
