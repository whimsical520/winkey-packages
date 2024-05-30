import fs from "fs";
import path from "path";

class WkFs {
  formatPath(iPath) {
    return iPath.split(path.sep).join("/");
  }

  readFilesSync(iPath, filter, ignoreFilter?) {
    const r = [];
    const that = this;

    const deep = function (rPath) {
      if (!fs.existsSync(rPath)) {
        return;
      }

      const list = fs.readdirSync(rPath);

      list.forEach((str) => {
        const mPath = that.formatPath(path.join(rPath, str));
        const filterPath = that.formatPath(path.relative(iPath, mPath));

        if (ignoreFilter && filterPath.match(ignoreFilter)) {
          return;
        }

        if (fs.statSync(mPath).isDirectory()) {
          deep(mPath);
        } else {
          let run = true;
          if (filter) {
            if (typeof filter == "function") {
              run = filter(mPath);
            } else {
              if (filterPath.match(filter) == null) {
                run = false;
              }
            }
          }
          if (run) {
            r.push(mPath);
          }
        }
      });
    };

    deep(iPath);
    return r;
  }
}

const wkFs = new WkFs();

export default wkFs;
