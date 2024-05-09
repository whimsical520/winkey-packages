import commander from 'commander'
import task from './task'

const { program } = commander

/** 初始化脚手架 */
program.command('init').action()