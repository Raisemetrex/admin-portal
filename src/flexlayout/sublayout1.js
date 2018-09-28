const sublayout1 = {
	"global": {},
	"layout": {
		"type": "row",
		"id": "#1",
		"children": [
			{
				"type": "tabset",
				"id": "#2",
				"weight": 41.67178856791641,
				"children": [
					{
						"type": "tab",
						"id": "#3",
						"name": "Letters",
						"component": "sub",
						"config": {
							"model": {
								"global": {},
								"layout": {
									"type": "row",
									"id": "#1",
									"children": [
										{
											"type": "tabset",
											"id": "#2",
											"weight": 25,
											"selected": 1,
											"children": [
												{
													"type": "tab",
													"id": "#3",
													"name": "AAAA",
													"component": "grid",
													"config": {
														"id": "1"
													}
												},
												{
													"type": "tab",
													"id": "#5",
													"name": "BBBB",
													"component": "grid",
													"config": {
														"id": "2"
													}
												}
											],
											"active": true
										}
									]
								},
								"borders": []
							}
						}
					}
				],
				"active": true
			},
			{
				"type": "tabset",
				"id": "#8",
				"weight": 24.99487809875026,
				"children": [
					{
						"type": "tab",
						"id": "#4",
						"name": "Numbers",
						"component": "sub",
						"config": {
							"model": {
								"global": {},
								"layout": {
									"type": "row",
									"id": "#1",
									"children": [
										{
											"type": "tabset",
											"id": "#2",
											"weight": 50,
											"children": [
												{
													"type": "tab",
													"id": "#3",
													"name": "1111",
													"component": "grid",
													"config": {
														"id": "1"
													}
												}
											]
										},
										{
											"type": "tabset",
											"id": "#4",
											"weight": 50,
											"children": [
												{
													"type": "tab",
													"id": "#5",
													"name": "2222",
													"component": "grid",
													"config": {
														"id": "2"
													}
												}
											]
										}
									]
								},
								"borders": []
							}
						}
					}
				]
			}
		]
	},
	"borders": []
}

export default sublayout1;
