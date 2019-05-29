
	
	//Melhorias que devem ser feitas:
	//-Tabela Q dinamica.
	//-Ponto de parada.

	//Escolhe ação randomicamente para o estado passado.
	function EscolheAcao(estado){
		
		//Escolhe randomicamente uma movimentação.
		var acaoEscolhida = Math.floor(Math.random() * 4);
		
		//Enquanto está movimentação não seja valida escolhe novamente.
		while(QL.qlist[estado-1].acoes[acaoEscolhida] == 0)
			acaoEscolhida = Math.floor(Math.random() * 4);
		
		//No momento que encontrar uma movimentação valida, chama função de execução.
		ExecutaAcao(acaoEscolhida, estado);
	}

	//Executa ação para o estado passados.
	function ExecutaAcao(acaoEscolhida, estado){
		
		//Pega nova posição no vetor de estados, de acordo com ação.
		var estadoProximo = QL.transicoesAmbiente[estado-1][acaoEscolhida];
		
		//Armazena recompensa calculada de acordo com ação escolhida.
		QL.qlist[estado-1].recompensas[acaoEscolhida] = QL.recompensaAmbiente[estadoProximo-1] + QL.gamma * EscolheMaiorQ(estadoProximo);
		
		//Chama função de atualizar estado.
		AtualizaEstado(estadoProximo);
	}
	
	//Retorna maior valor de recompensa ao redor do estado informado.
	function EscolheMaiorQ(estadoProximo){
		
		var maiorQ = -5000000000;
		for(var i=0;i<3;i++)
		{
			if(QL.qlist[estadoProximo-1].acoes[i])
				if(QL.qlist[estadoProximo-1].recompensas[i] > maiorQ)
					maiorQ = QL.qlist[estadoProximo-1].recompensas[i];
		}
		return maiorQ;
	}
	
	//Atualiza estado atual.
	function AtualizaEstado(estadoProximo){
		
		//Manipula o estado.
		var estadoAtual = QL.estadoAtual;
		QL.estadoAtual = estadoProximo;
		
		//Atualiza visual da tabela no navegador.
		AtualizaCSS(estadoAtual,estadoProximo);
	}

	//#region CSS
	
	function AtualizaCSS(estadoAtual,estadoProximo){	
		AtualizaCSSAnterior(estadoAtual);
		var Q = "#Q" + estadoProximo;
		$(Q).css('background','#e60000');
		$(Q).text(QL.qlist[estadoProximo-1].recompensas[]);
	};

	function AtualizaCSSAnterior(estado){
	var Q = "#Q" + estado;
		if(estado==50 || estado==1){
			$(Q).css('background','#008744');//Verde
		}
		else if(estado==7 || estado==10 || estado==11 || estado==14 || estado==19 || estado==20 || estado==21 || 
			estado==24 || estado==27 || estado==30 || estado==31 || estado==37 || estado==39 || estado==40 || estado==41)
		{
			$(Q).css('background','#505050');//Preto
		}
		else
		{
			$(Q).css('background','#0057e7');//Azul
		}
	}		
		
	//#endregion CSS

	//#region Construtores

	function Q(estado, acoes, recompensas){
		this.estado = estado;
		this.acoes = acoes
		this.recompensas = recompensas;
	}

	function Qlearner(gamma){
		this.qlist = [];
		this.recompensaAmbiente = [];
		this.transicoesAmbiente = [];
		this.gamma = gamma;
		this.estadoAtual = null;
	}

	function Add(estado, acoes, transicoes){
		var q = new Q(estado,acoes,[0,0,0,0]);
		QL.qlist.push(q);
		QL.transicoesAmbiente.push(transicoes);	
	};

	function AddRecompensa(){
		for(var i=1;i<=50;i++)
		{
			if(i==50){
				QL.recompensaAmbiente.push(100)
			}
			else if(i==7 || i==10 || i==11 || i==14 || i==19 || i==20 || i==21 || 
				i==24 || i==27 || i==30 || i==31 || i==37 || i==39 || i==40 || i==41)
			{
				QL.recompensaAmbiente.push(-100);
			}
			else{
				QL.recompensaAmbiente.push(-1);	
			}

		}
	}

	var QL = new Qlearner(0.8);
	
	// Iniciando tabela Q
	// (pos, [posições validas (norte, leste, sul, oeste)], [vetores laterais (norte, leste, sul, oeste)])
	Add(1,[1,1,0,0],[2,10,0,0]);
	Add(2,[1,1,1,0],[3,9,1,0]);
	Add(3,[1,1,1,0],[4,8,2,0])
	Add(4,[1,1,1,0],[5,7,3,0])
	Add(5,[0,1,1,0],[0,6,4,0])
	Add(6,[0,1,1,1],[0,15,7,5])
	Add(7,[1,1,1,1],[6,14,8,4])
	Add(8,[1,1,1,1],[7,13,9,3])
	Add(9,[1,1,1,1],[8,12,10,2]);
	Add(10,[1,1,0,1],[9,11,0,1])
	Add(11,[1,1,0,1],[12,20,0,10])
	Add(12,[1,1,1,1],[13,19,11,9]);
	Add(13,[1,1,1,1],[14,18,12,8])
	Add(14,[1,1,1,1],[15,17,13,7])
	Add(15,[0,1,1,1],[0,16,14,6])
	Add(16,[0,1,1,1],[0,25,17,15])
	Add(17,[1,1,1,1],[16,24,18,14])
	Add(18,[1,1,1,1],[17,23,19,13])
	Add(19,[1,1,1,1],[18,22,20,12]);
	Add(20,[1,1,0,1],[19,21,0,11])
	Add(21,[1,1,0,1],[22,30,0,20])
	Add(22,[1,1,1,1],[23,29,21,19]);
	Add(23,[1,1,1,1],[24,28,22,18])
	Add(24,[1,1,1,1],[25,27,23,17])
	Add(25,[0,1,1,1],[0,26,24,16])
	Add(26,[0,1,1,1],[0,35,27,25])
	Add(27,[1,1,1,1],[26,34,28,24])
	Add(28,[1,1,1,1],[27,33,29,23])
	Add(29,[1,1,1,1],[28,32,30,22]);
	Add(30,[1,1,0,1],[29,31,0,21])
	Add(31,[1,1,0,1],[32,40,0,30])
	Add(32,[1,1,1,1],[33,39,31,29]);
	Add(33,[1,1,1,1],[34,38,32,28])
	Add(34,[1,1,1,1],[35,37,33,27])
	Add(35,[0,1,1,1],[0,36,34,26])
	Add(36,[0,1,1,1],[0,45,37,35])
	Add(37,[1,1,1,1],[36,44,38,34])
	Add(38,[1,1,1,1],[37,43,39,33])
	Add(39,[1,1,1,1],[38,42,40,32]);
	Add(40,[1,1,0,1],[39,41,0,31])
	Add(41,[1,1,0,1],[42,50,0,40])
	Add(42,[1,1,1,1],[43,49,41,39]);
	Add(43,[1,1,1,1],[44,48,42,38])
	Add(44,[1,1,1,1],[45,47,43,37])
	Add(45,[0,1,1,1],[0,46,44,36])
	Add(46,[0,0,1,1],[0,0,47,45])
	Add(47,[1,0,1,1],[46,0,48,44])
	Add(48,[1,0,1,1],[47,0,49,43])
	Add(49,[1,0,1,1],[48,0,50,42]);
	Add(50,[1,0,0,1],[49,0,0,41])

	AddRecompensa();
	
	//#endregion Construtores
	
	//Inicializar programa e executar.
	function Inicializar(){
		QL.estadoAtual = 1;
		var cont = 0;
		var qntd = parseInt($('#txtQntd').val());
		var loop = setInterval(function(){
			if(cont==qntd){
				clearInterval(loop);
			}
			else{
				EscolheAcao(QL.estadoAtual);
				if(QL.estadoAtual==50){
					QL.estadoAtual = 1;
					cont++;
				}	
			}			 
		},0.0000001)
				
	}

	function mostraTabelaQ(){
		for(var i=0;i<50;i++){
			for(var j=0;j<4;j++)
				if(QL.qlist[i].acoes[j]){
					var cont = i+1;
					if(j==0)
						console.log("E"+cont+ " Norte" + "-     " + QL.qlist[i].recompensas[j])
					else if(j==1)
						console.log("E"+cont + " Leste" + "-     " + QL.qlist[i].recompensas[j])
					else if(j==2)
						console.log("E"+cont+ " Sul" + "-       " + QL.qlist[i].recompensas[j])	
					else if(j==3)
						console.log("E"+cont+ " Oeste" + "-     " + QL.qlist[i].recompensas[j])
				}
    			
		}
	}

	//Eventos

	$("#btnInicia").on('click',function(){
		Inicializar();
	})

	$('#mostraTabela').on('click',function(){
		mostraTabelaQ();
	})