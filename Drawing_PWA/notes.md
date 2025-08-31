# Flood Fill algorithm
----
ele basicamente olha as células ao redor da célula clicada, se for da cor que deve ser alterada ele altera, se for uma borda ou for de outra cor ele volta e tenta procurar outra célula.
Parâmetros necessário -
- x da célula
- y da célula
- cor antiga (que deve ser alterada)
- cor nova (cor que vai ser colocada no lugar da antiga)

Cada célula vai fazer 4 verificações:
- célula x+1
- célula y+1
- célula x-1
- célula y-1

E para cada uma dessas verificações ele vai verificar se a cor da célula deve ser alterada. Se a cor da célula sendo verificada for igual a cor antiga então ele altera para a cor nova 

```
    if(celula_atual.cor == cor_antiga){
        celula_atual.cor = cor_nova
    }
```

e as verificações de "não alterar" são basicamente 2, verificar se está em uma borda/final da imagem, ou se a cor é diferente da que deve ser alterada, algo como:

```
    if(((celula.x + 1) > (grid.length) or (celula.x - 1 < 0) or (celula.y + 1 > grid.length) or (celula.y - 1< 0>))){
        console.log("não deve ser alterada")
        }
        else{
            celula.cor = cor_nova
        }
```

teremos duas funções, uma para a verificação (que vai ser usada 4 vezes por célula, uma para cada lado). E uma para fazer a verificação inicial e pintar a primeira célula, começando o algoritmo.