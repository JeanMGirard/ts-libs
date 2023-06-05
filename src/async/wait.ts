import {isPromise, isFunction} from "../guards";

export interface IWaitOptions {
  loops?: number | false,
  err?: boolean,
  interval?: number
}
export type IWaitCond = boolean | object | Promise<any> | ((...args) => IWaitCond | void)

export async function wait(ms: number) {
  await new Promise(resolve => setTimeout(() => resolve(true), ms));
  return ms;
}
export async function waitUntil(cond: IWaitCond, options: IWaitOptions = {}) {
  const { interval = 300, err = true, loops = 50 } = options;
  let i = 0;
  while (!cond && (!loops || i < loops)){
    await new Promise(resolve => setTimeout(() => resolve(true), interval));
    i += 1;
  }
  if(!cond && err) throw new Error("Could not wait until...")
}
export async function waitFor(cond: IWaitCond, options: IWaitOptions = {}) {
  if(typeof cond === 'boolean') return waitUntil(cond, options)
  return  Promise.resolve(cond)
}
export async function waitForChange(obj: IWaitCond, options: IWaitOptions = {}) {
  const initial = obj;
  return waitFor(() => (obj !== initial), options)
}
export async function sleep(ms: number){
  return await wait(ms)
}
