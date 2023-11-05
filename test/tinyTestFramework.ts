export function assert(arg0: any) {
  if (!arg0) {
    throw new Error("test failed!");
  }
}

export function assertEq(arg0: any, arg1: any) {
  if (arg0 !== arg1) {
    throw new Error(`expected ${arg0} to equal ${arg1}`);
  }
}
