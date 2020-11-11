import zh from 'config/language/zh_CN';
import en from 'config/language/en_US';
import Config from 'config/Config';

export default {
  zhCN:zh,
  enUS:en
}[Config.languageEnv];