var args = process.argv.splice(2);

class ZhongZhuiZhuanNiBoLan {
    constructor(){
        this.inputData = [...(args[0].split('')),'#']
        this.outputData = []
        this.codeData = []
    }


    start(){
        this.inputData.forEach((item,id)=>{
            if(item!=='+'&&item!=='-'&&item!=='*'&&item!=='/'&&item!=='('&&item!==')'&&item!=='#'){

                this.outputData.push(item)
            }else if(item==='('){
                this.codeData.push(item)
            }else if(item==='+'||item==='-'){
                let codeLoc = -1
                this.codeData.reverse().forEach((itemCode,idCode)=>{
                    if(itemCode==='(')
                        codeLoc=idCode
                })
                this.codeData.reverse()
                if(codeLoc!==-1)
                    for(let i=0;i<codeLoc;i++)
                        this.outputData.push(this.codeData.pop())
                else{
                    let t=this.codeData.length
                    for(let i=0;i<t;i++)
                        this.outputData.push(this.codeData.pop())}
                this.codeData.push(item)
            }else if(item==='*'||item==='/'){
                let codeLoc = -1
                let temp =[]
                this.codeData.reverse().forEach((itemCode,idCode)=>{
                    if(itemCode==='(')
                        codeLoc=idCode
                })
                this.codeData.reverse()
                if(codeLoc!==-1) {
                    for (let i = 0; i < codeLoc; i++) {
                        if (this.codeData[this.codeData.length - 1] === '*' || this.codeData[this.codeData.length - 1] === '/')
                            this.outputData.push(this.codeData.pop())
                        else
                            temp.push(this.codeData.pop())
                    }
                }
                else {
                    let t=this.codeData.length
                    for (let i = 0; i < t; i++) {
                        if (this.codeData[this.codeData.length - 1] === '*' || this.codeData[this.codeData.length - 1] === '/')
                            this.outputData.push(this.codeData.pop())
                        else
                            temp.push(this.codeData.pop())
                    }
                }
                let v =temp.length
                for (let j = 0; j <v ; j++)
                    this.codeData.push(temp.pop())
                this.codeData.push(item)
            }else if(item==='#'){
                let y = this.codeData.length
                for(let i = 0;i<y;i++)
                this.outputData.push(this.codeData.pop())
            }
        })


    }

}

res = new ZhongZhuiZhuanNiBoLan()
res.start()

console.log(res.outputData.join(''))
