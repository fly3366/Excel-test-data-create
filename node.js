const XLSX = require('xlsx');

class WorkBook {
    /**
     * @param {Object} data Excel表格源数据，格式如下：
     * {
     *      SheetName: [
     *
     *      ]
     * }
     */
    constructor(srcData) {
        this.srcData = srcData;
        this.workbook = {};
        this.workbook.SheetNames = [];
        this.workbook.Sheets = {};

        for(let item in srcData) {
            this.workbook.SheetNames.push(item);
            this.addSheet(item, srcData[item]);
        }
    }

    /**
     * 往Excel文件添加一个表格
     * @param {string} sheetName 表格名
     * @param {object} sheet 表格数据
     * @returns void
     */
    addSheet(sheetName, sheet) {
        this.workbook['Sheets'][sheetName] = {};
        let row = sheet.length;
        let col = sheet[0].length;
        let to = '';

        for(let i=0; i<row; i++) {
            for(let j=0; j<col; j++) {
                let key = this.ten2twentysix(j+1) + (i+1);
                this.workbook['Sheets'][sheetName][key] = {'v': sheet[i][j]};
                to = key;
            }
        }
        this.workbook['Sheets'][sheetName]['!ref'] = 'A1:' + to;
    }


    /**
     * 10进制转26进制
     * @param {number} num 正整数
     * @returns string
     */
    ten2twentysix(num) {
        let str = '';
        while(num) {
            let rest = num % 26;
            num = (num-rest) / 26;
            str += String.fromCharCode(rest + 64);
        }

        let twentysixNumber = '';
        let len = str.length;
        for(let i=len-1; i>=0; i--) {
            twentysixNumber += str[i];
        }

        return twentysixNumber;
    }

    /**
     * 将数据写入Excel
     * @param {string} filename 文件路径
     */
    writeFile(filename) {
        XLSX.writeFile(this.workbook, filename);
    }

    randomNum(minNum,maxNum){
        switch(arguments.length){
            case 1:
                return parseInt(Math.random()*minNum+1,10);
                break;
            case 2:
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
                break;
            default:
                return 0;
                break;
        }
    }
    randomNumWithOne(minNum,maxNum){
        switch(arguments.length){
            case 1:
                return (Math.random()*minNum+1).toString().slice(0,4);
                break;
            case 2:
                let tmpNum = (Math.random()*(maxNum-minNum+1)+minNum);
                if(tmpNum >= 100){
                    tmpNum = tmpNum.toString().slice(0,5)
                }else {
                    tmpNum = tmpNum.toString().slice(0,4)
                }
                return tmpNum;
                break;
            default:
                return 0;
                break;
        }
    }
    randomNumWithFour(minNum,maxNum){
        switch(arguments.length){
            case 1:
                return (Math.random()*minNum+1).toString().slice(0,7);
                break;
            case 2:
                let tmpNum = (Math.random()*(maxNum-minNum+1)+minNum);
                if(tmpNum >= 100){
                    tmpNum = tmpNum.toString().slice(0,8)
                }else {
                    tmpNum = tmpNum.toString().slice(0,7)
                }
                return tmpNum;
                break;
            default:
                return 0;
                break;
        }
    }
}

console.log("开始生成");
var args = process.argv.splice(2);
console.log("\n长度:"+args[0]+"\n数据较大请等待"+"\n输出文件"+args[1]+"\n....")
if(args[0]>=1000000){
    console.log("超过100W的数据耗费更长的Time");
}
var biao = {
   '环境': [
          ['温度℃','湿度%','光照强度L','危险气体浓度ppm','安全状态']
      ]
    };

var data1 = [

    ['温度℃','湿度%','光照强度L','危险气体浓度ppm','安全状态']

];


var workS = new WorkBook(biao);
for (let i = 0; i <args[0] ; i++) {
    let tmpOb = [workS.randomNum(5,35),workS.randomNum(20,60),workS.randomNumWithOne(70,450),workS.randomNumWithFour(0,1.3),'正常'];
    if(tmpOb[0]<16||tmpOb[0]>22||parseInt(tmpOb[1])<30||tmpOb[2]<30.0||parseInt(tmpOb[3])>1.2500||parseInt(tmpOb[3])<0.0100){
        tmpOb[4] = '不正常'
    }
    console.log(tmpOb)
    data1.push(tmpOb);
}
    workS.addSheet('环境',data1);
    XLSX.writeFile(workS.workbook,args[1]+'.xlsx')
