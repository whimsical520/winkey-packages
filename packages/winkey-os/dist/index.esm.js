const IS_WINDOWS = process.platform == 'win32';
const IS_LINUX = process.platform === 'linux';

const fs = require('fs');
const { exec, spawn } = require('child_process');
const runCMD = (obj) => {
    const runner = (resolve, reject) => {
        if (!obj.cmd) {
            return reject('没任何 cmd 操作');
        }
        if (obj.targetPath && !fs.existsSync(obj.targetPath)) {
            return reject(`runCMD 当前目录不存在: ${obj.targetPath}`);
        }
        let iCmd = obj.cmd;
        if (obj.newWindow) {
            if (IS_WINDOWS) {
                iCmd = `cmd /k start cmd /k ${iCmd}`;
            }
            else if (IS_LINUX) {
                iCmd = `${iCmd}`;
            }
            else {
                iCmd = `osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'delay 0.2' -e 'tell application "Terminal" to do script "cd ${obj.targetPath} && ${iCmd}" in selected tab of the front window'`;
            }
        }
        const child = exec(iCmd, {
            maxBuffer: 2000 * 1024,
            cwd: obj.targetPath || ''
        }, (err, stdout) => {
            if (err) {
                if (obj.showOutput) {
                    console.log('cmd运行 出错');
                    console.log(err.stack);
                }
                reject(err);
            }
            else {
                resolve(stdout);
            }
        });
        child.stdout.setEncoding('utf8');
        if (obj.showOutput) {
            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        }
        if (obj.newWindow && IS_WINDOWS) {
            resolve();
        }
    };
    return new Promise(runner);
};
const runSpawn = (obj) => {
    const runner = (resolve, reject) => {
        if (!obj.cmd) {
            return reject('没任何 cmd 操作');
        }
        if (obj.targetPath && !fs.existsSync(obj.targetPath)) {
            return reject(`runSpawn 当前目录不存在: ${obj.targetPath}`);
        }
        let iCmd = obj.cmd;
        if (obj.newWindow) {
            if (IS_WINDOWS) {
                iCmd = `cmd /k start cmd /k ${iCmd}`;
            }
            else if (IS_LINUX) {
                iCmd = `${iCmd}`;
            }
            else {
                iCmd = `osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'delay 0.2' -e 'tell application "Terminal" to do script "cd ${obj.targetPath} && ${iCmd}" in selected tab of the front window'`;
            }
        }
        let ops = [];
        let hand = '';
        if (IS_WINDOWS) {
            hand = 'cmd.exe';
            ops = ['/s', '/c', iCmd];
        }
        else {
            hand = '/bin/sh';
            ops = ['-c', iCmd];
        }
        if (obj.type === 'pipe') {
            const child = spawn(hand, iCmd, {
                cwd: obj.targetPath || process.cwd,
                silent: false,
                stdio: 'pipe'
            });
            child.stdout.on('data', (d) => {
                obj.logger && obj.logger('wait', d.toString());
            });
            let errMsg = '';
            child.stderr.on('data', (d) => {
                errMsg = `${errMsg}${d.toString()}`;
                obj.logger && obj.logger('fail', errMsg);
            });
            child.on('exit', (code) => {
                if (code) {
                    if (errMsg) {
                        reject(errMsg);
                    }
                    else {
                        reject(new Error(`get exit code ${code}`));
                    }
                }
                else {
                    resolve();
                }
            });
        }
        else {
            const child = spawn(hand, ops, {
                stdio: 'inherit',
                cwd: obj.targetPath || process.cwd
            });
            child.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`get exit code ${code}`));
                    return;
                }
                resolve();
            });
        }
    };
    return new Promise(runner);
};
const openBrowser = (address) => {
    if (/^[/]{2}/.test(address)) {
        address = `http:${address}`;
    }
    if (IS_WINDOWS) {
        return runCMD({
            cmd: `start ${address.replace(/&/g, '^&')}`
        });
    }
    else if (IS_LINUX) {
        return Promise.resolve();
    }
    else {
        return runCMD({
            cmd: `open ${address.replace(/&/g, '\\&')}`
        });
    }
};

export { openBrowser, runCMD, runSpawn };
