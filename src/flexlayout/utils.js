
export function getMasterDetailLayout(master, details, {weight} = {weight: {master: 20, detail: 80}}) {
  const base = {
    global: {},
  	layout: {
  		type: 'row',
  		children: [
        {
          type: 'row',
          weight: 150,
          children: [
            {
      				type: 'tabset',
              // name: 'Master',
      				weight: weight.master,
      				enableClose: false,
              enableTabStrip: false,
              enableDrop: false,
      				children: [
      				],
      			},
            {
      				type: 'tabset',
      				weight: weight.detail,
      				enableClose: false,
              enableDivide: false,
      				children: [
      				]
      			},
          ],
        },
  		],
  	},
  };

  const masterTab = {
    type: 'tab',
    enableClose: false,
    enableDrag: false,
    emableRename: false,
    ...master,
  }
  base.layout.children[0].children[0].name = master.name;
  base.layout.children[0].children[0].children.push(masterTab);
  details.forEach(detail => {
    const detailTab = {
      type: 'tab',
      enableClose: false,
      enableRename: false,
      ...detail,
    };
    base.layout.children[0].children[1].children.push(detailTab);
  })

  return base;

}
