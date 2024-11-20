function exec(str: string) {
  return str.match(/[/]/g)?.length;
}

console.log(exec('chec/efwefc/'));
