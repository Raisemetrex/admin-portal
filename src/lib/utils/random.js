
export function ipsum(paras = null) {
  const text = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis ultrices aliquam. Pellentesque massa mauris, convallis at odio pulvinar, faucibus blandit purus. Etiam laoreet dui quam, molestie egestas massa luctus eget. Aliquam vitae nibh erat. Mauris accumsan mauris vel mollis posuere. Maecenas ac consequat tortor. Curabitur aliquet tincidunt mollis. Maecenas vitae felis ligula. Phasellus porta accumsan efficitur. Aliquam et risus quis lectus consequat consectetur. Integer consectetur in est dignissim mattis. Integer lacus ligula, posuere egestas lacus pellentesque, fermentum pharetra sem. Sed luctus at elit vitae vehicula.

  Praesent nec eleifend felis, in auctor sapien. Aliquam ex purus, aliquet ut lectus a, convallis pulvinar felis. Aliquam nisi neque, volutpat id porta id, tincidunt vel elit. Suspendisse ut mauris arcu. Morbi dictum dui sodales, mattis lectus nec, tempus lorem. Nam rhoncus arcu id ligula dapibus, eget vehicula nulla pellentesque. Donec non sapien elementum, laoreet ante vel, suscipit nulla. Proin vel venenatis dolor. Fusce nulla nunc, feugiat sed odio quis, venenatis iaculis nibh. Etiam porttitor ex nec ligula pharetra congue. Pellentesque ac libero tincidunt, fermentum mi in, dapibus justo. Pellentesque bibendum urna ut lacus sodales, in aliquam lectus vestibulum.

  In nec quam arcu. Cras ultrices tellus et venenatis consequat. Donec ut lorem sit amet tortor tempus tempor. Etiam malesuada consequat augue, id commodo sem venenatis sed. Nulla eget mollis eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec volutpat orci. Nullam sit amet eros in lectus lobortis mollis consectetur eget sem. Nulla a felis augue. Donec quam est, consequat vel sodales sit amet, ultricies non leo. Aenean nec erat pretium augue facilisis dictum. Ut laoreet posuere auctor. Aliquam posuere, neque quis volutpat egestas, leo orci tincidunt urna, sodales vulputate nibh dui vitae ipsum. Quisque ac volutpat nisl.

  Maecenas porta ligula enim, ut pretium massa convallis et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam pulvinar mollis velit, vitae facilisis turpis rhoncus non. Sed a rhoncus magna, ac posuere diam. Nullam ornare nisl mi, eu vehicula nulla efficitur ac. Nam diam arcu, rhoncus scelerisque placerat quis, pulvinar tempus mi. Proin massa risus, bibendum eget enim ut, sagittis volutpat tortor. Sed gravida nulla quis dapibus varius. Quisque finibus et libero sit amet fringilla. Aliquam pellentesque aliquet ante, ornare tempus nisl dapibus ac. Donec eget commodo velit. Suspendisse sollicitudin maximus posuere. Mauris vel ultrices ante, eu dapibus lacus. Aenean eros dui, viverra ac tellus ut, fermentum commodo est.

  Donec sit amet tempor ligula, a pretium ex. Donec sed mi eget massa tempor tincidunt ac sit amet mi. Aliquam bibendum dolor erat, ac volutpat tortor placerat ac. Nam non auctor quam. Duis a elementum lacus. Quisque tincidunt, est at mollis elementum, erat dui cursus risus, id pellentesque erat metus vitae urna. Praesent malesuada fringilla lacus, in facilisis dolor cursus sed. Nunc congue est at massa molestie varius. Quisque accumsan non nibh egestas eleifend. Nunc at odio at justo vestibulum malesuada. Mauris ac felis luctus, bibendum ipsum at, pretium libero. Praesent ultricies sollicitudin diam a porttitor. Cras auctor, orci nec tempor mattis, enim nisl dictum turpis, in volutpat nulla lorem eu libero. Morbi molestie augue nec cursus fermentum. Nullam quis lorem eu sapien hendrerit commodo vel non arcu. Vivamus vehicula at nunc ut pulvinar.
  `;
  const testParas = text.split('\n\n');
  return testParas[0];
}