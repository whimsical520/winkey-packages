import path from 'path'
const os = require('os')
const fs = require('fs')

const NEWLINE = '\n';
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*("[^"]*"|'[^']*'|.*?)(\s+#.*)?$/;
const RE_NEWLINES = /\\n/g;
const NEWLINES_MATCH = /\r\n|\n|\r/;

var main$1: any = {exports: {}};

// Parses src into an Object
function parse (src: any, options: {
  debug: boolean
  multiline: boolean
}) {
const debug = Boolean(options && options.debug);
const multiline = Boolean(options && options.multiline);
const obj: any = {};

// convert Buffers before splitting into lines and processing
const lines = src.toString().split(NEWLINES_MATCH);

for (let idx = 0; idx < lines.length; idx++) {
    let line = lines[idx];

    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL);
    // matched?
    if (keyValueArr != null) {
    const key = keyValueArr[1];
    // default undefined or missing values to empty any
    let val = (keyValueArr[2] || '');
    let end = val.length - 1;
    const isDoubleQuoted = val[0] === '"' && val[end] === '"';
    const isSingleQuoted = val[0] === "'" && val[end] === "'";

    const isMultilineDoubleQuoted = val[0] === '"' && val[end] !== '"';
    const isMultilineSingleQuoted = val[0] === "'" && val[end] !== "'";

    // if parsing line breaks and the value starts with a quote
    if (multiline && (isMultilineDoubleQuoted || isMultilineSingleQuoted)) {
        const quoteChar = isMultilineDoubleQuoted ? '"' : "'";

        val = val.substring(1);

        while (idx++ < lines.length - 1) {
        line = lines[idx];
        end = line.length - 1;
        if (line[end] === quoteChar) {
            val += NEWLINE + line.substring(0, end);
            break
        }
        val += NEWLINE + line;
        }
    // if single or double quoted, remove quotes
    } else if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end);

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
        val = val.replace(RE_NEWLINES, NEWLINE);
        }
    } else {
        // remove surrounding whitespace
        val = val.trim();
    }

    obj[key] = val;
    } else if (debug) {
    const trimmedLine = line.trim();

    // ignore empty and commented lines
    if (trimmedLine.length && trimmedLine[0] !== '#') {
        console.log(`Failed to match key and value when parsing line ${idx + 1}: ${line}`);
    }
    }
}

  return obj  
}

function lookupFile(dir: any, formats: any, options?: any): any {
  for (const format of formats) {
      const fullPath = path.join(dir, format);
      if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
          const result = options?.pathOnly
              ? fullPath
              : fs.readFileSync(fullPath, 'utf-8');
          if (!options?.predicate || options.predicate(result)) {
              return result;
          }
      }
  }
  const parentDir = path.dirname(dir);
  if (parentDir !== dir &&
      (!options?.rootDir || parentDir.startsWith(options?.rootDir))) {
      return lookupFile(parentDir, formats, options);
  }
}

function resolveHome (envPath: any) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

var dotenvExpand = function (config: any) {
    // if ignoring process.env, use a blank object
    var environment = config.ignoreProcessEnv ? {} : process.env;
  
    var interpolate = function (envValue: any) {
      var matches = envValue.match(/(.?\${?(?:[a-zA-Z0-9_]+)?}?)/g) || [];
  
      return matches.reduce(function (newEnv: any, match: any) {
        var parts: any = /(.?)\${?([a-zA-Z0-9_]+)?}?/g.exec(match);
        var prefix = parts[1];
  
        var value, replacePart;
  
        if (prefix === '\\') {
          replacePart = parts[0];
          value = replacePart.replace('\\$', '$');
        } else {
          var key = parts[2];
          replacePart = parts[0].substring(prefix.length);
          // process.env value 'wins' over .env file's value
          value = environment.hasOwnProperty(key) ? environment[key] : (config.parsed[key] || '');
  
          // Resolve recursive interpolations
          value = interpolate(value);
        }
  
        return newEnv.replace(replacePart, value)
      }, envValue)
    };
  
    for (var configKey in config.parsed) {
      var value = environment.hasOwnProperty(configKey) ? environment[configKey] : config.parsed[configKey];
  
      config.parsed[configKey] = interpolate(value);
    }
  
    for (var processKey in config.parsed) {
      environment[processKey] = config.parsed[processKey];
    }
  
    return config
  };
  
  var main = dotenvExpand;

// Populates process.env from .env file
function config (options: any) {
    let dotenvPath: any = path.resolve(process.cwd(), '.env');
    let encoding: any = 'utf8';
    const debug = Boolean(options && options.debug);
    const override = Boolean(options && options.override);
    const multiline = Boolean(options && options.multiline);
  
    if (options) {
      if (options.path != null) {
        dotenvPath = resolveHome(options.path);
      }
      if (options.encoding != null) {
        encoding = options.encoding;
      }
    }
  
    try {
      // specifying an encoding returns a any instead of a buffer
      const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }), { debug, multiline });
  
      Object.keys(parsed).forEach(function (key) {
        if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
          process.env[key] = parsed[key];
        } else {
          if (override === true) {
            process.env[key] = parsed[key];
          }
  
          if (debug) {
            if (override === true) {
                console.log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
            } else {
                console.log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
            }
          }
        }
      });
  
      return { parsed }
    } catch (e: any) {
      if (debug) {
        console.log(`Failed to load ${dotenvPath} ${e.message}`);
      }
  
      return { error: e }
    }
  }
  
  const DotenvModule = {
    config,
    parse
  };
  
  main$1.exports.config = DotenvModule.config;
  main$1.exports.parse = DotenvModule.parse;
  main$1.exports = DotenvModule;

function arraify(target: any) {
  return Array.isArray(target) ? target : [target];
}

export const loadEnv = (mode: any, envDir: any, prefixes = 'VITE_') => {
  if (mode === 'local') {
    throw new Error(`"local" cannot be used as a mode name because it conflicts with ` +
        `the .local postfix for .env files.`);
  }
  const _prefixes = arraify(prefixes);
  const env: any = {};
  const envFiles = [
      /** mode local file */ `.env.${mode}.local`,
      /** mode file */ `.env.${mode}`,
      /** local file */ `.env.local`,
      /** default file */ `.env`
  ];
  // check if there are actual env variables starting with VITE_*
  // these are typically provided inline and should be prioritized
  for (const key in process.env) {
      if (_prefixes.some((prefix) => key.startsWith(prefix)) &&
          env[key] === undefined) {
          env[key] = process.env[key];
      }
  }
  for (const file of envFiles) {
      const path = lookupFile(envDir, [file], { pathOnly: true, rootDir: envDir });
      if (path) {
          const parsed = main$1.exports.parse(fs.readFileSync(path), {
              debug: process.env.DEBUG?.includes('vite:dotenv') || undefined
          });
          // let environment variables use each other
          main({
              parsed,
              // prevent process.env mutation
              ignoreProcessEnv: true
          });
          // only keys that start with prefix are exposed to client
          for (const [key, value] of Object.entries(parsed)) {
              if (_prefixes.some((prefix) => key.startsWith(prefix)) &&
                  env[key] === undefined) {
                  env[key] = value;
              }
              else if (key === 'NODE_ENV' &&
                  process.env.VITE_USER_NODE_ENV === undefined) {
                  // NODE_ENV override in .env file
                  process.env.VITE_USER_NODE_ENV = value as any;
              }
          }
      }
  }
  return env;
}