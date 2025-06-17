import chalk from 'chalk';
import {format} from 'date-fns'

const now=new Date()
const formated = () => chalk.gray(`[${format(now,"dd/MM/yy HH:mm:ss")}]`);
export const log = {
  info: (msg: string) => {
    console.log('----------------------------------------------------------------------')
    console.log(`${formated()}----${chalk.blue('[INFO]')}---${msg}`);

  },
  success: (msg: string) => {
    console.log('----------------------------------------------------------------------')
    console.log(`${formated()}----${chalk.green('[SUCCESS]')}---${msg}`);
  },
  warning: (msg: string) => {
    console.log('----------------------------------------------------------------------')
    console.log(`${formated()}----${chalk.yellow('[WARNING]')}---${msg}`);
  },
  error: (msg: string) => {
    console.log('----------------------------------------------------------------------')
    console.log(`${formated()}----${chalk.red('[ERROR]')}---${msg}`);
  },
  debug: (msg: string) => {
    console.log('----------------------------------------------------------------------')
    console.log(`${formated()}----${chalk.gray('[DEBUG]')}---${msg}`);
  },
};