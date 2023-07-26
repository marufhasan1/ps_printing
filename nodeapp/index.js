const { spawn } = require("child_process");
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express()

// var corsOptions = {
//     origin: 'http://203.188.245.58:7007',
//     // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
    next();
  });

// Allow CORS for a specific URL
// const whitelist = [
// 'http://203.188.245.58:7007',
// 'http://10.10.10.155:8080',
// 'http://localhost:8080',
// 'http://localhost',
// 'https://marufhasan.net',
// 'https://devweb.jerpbd.com'
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };


// app.use(cors(corsOptions));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true   
}));
// app.use(express.urlencoded({extended:false}));

const port = 3000

function triggerPrint(){
    //const ls = spawn('gswin64c.exe -sDEVICE=mswinpr2 -dBATCH -dNOPAUSE -dNoCancel -sOutputFile="%printer%Canon LBP6030/6040/6018L" C:\Users\nazu\Desktop\printing_experiment\test1.ps');
    ls    = spawn('cmd.exe', ['/c', 'trigger.cmd']);
    // ls    = spawn('powershell.exe', ['/c', 'trigger.cmd']);


    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });
    
    ls.stderr.on("data", data => {   
        console.log(`stderr: ${data}`);
    });
    
    ls.on('error', (error) => {
        console.log(`error: ${error.message}`); 
    });
    
    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.post('/', async (req, res) => {
    let formData = req.body;
    console.log('Request body:', req.body);
    console.log('Form data:', formData);
    var page_data = JSON.parse(formData.page_data)
    await generatePSFile(formData.layout,page_data);
    triggerPrint()

    res.send(JSON.stringify(formData));
});

const fs = require('fs/promises');  

async function generatePSFile(layout,page_data) {
    try {
        const content = generateContent(layout,page_data);
        await fs.writeFile('../page.ps', content,{ flag: 'w+' });
    } catch (err) {
        console.log(err);
    }
}

function generateContent(layout,page_data){

    var pageLayouts = {
        "hold_data": {
            config:{
                font_size: 8
            },
            page_description:[
                    [
                        {
                            column_x_position: 0,
                            column_y_position: 0,
                            position:{
                                name:[148,718],
                                grn_no:[148,703],
                                mfg_date:[148,688],
                                container:[148,673],
                                qc_ref_no:[148,658],
                                holding_time_exp:[148,644],
                                reason_for_hold:[148,625,40],
                            }
                        },  
                        {
                            column_x_position: 260,
                            column_y_position: 0,
                            position:{
                                name:[148,718],
                                grn_no:[148,703],
                                mfg_date:[148,688], 
                                container:[148,673],
                                qc_ref_no:[148,658],
                                holding_time_exp:[148,644],
                                reason_for_hold:[148,625,40],
                            }
                        }, 
                    ],
                    [
                        {
                            column_x_position: 0,
                            column_y_position: 267,
                            position:{
                                name:[148,718],
                                grn_no:[148,703],
                                mfg_date:[148,688],
                                container:[148,673],
                                qc_ref_no:[148,658],
                                holding_time_exp:[148,644],
                                reason_for_hold:[148,625,40],
                            }
                        },  
                        {
                            column_x_position: 260,
                            column_y_position: 267,
                            position:{
                                name:[148,718],
                                grn_no:[148,703],
                                mfg_date:[148,688],
                                container:[148,673],
                                qc_ref_no:[148,658],
                                holding_time_exp:[148,644],
                                reason_for_hold:[148,625,40],
                            }
                        }, 
                    ],
                    [
                        {
                            column_x_position: 0,
                            column_y_position: 540,
                            position:{
                                name:[148,718],
                                grn_no:[148,703],
                                mfg_date:[148,688],
                                container:[148,673],
                                qc_ref_no:[148,658],
                                holding_time_exp:[148,644],
                                reason_for_hold:[148,625,40],
                            }
                        },  
                        {
                            column_x_position: 260,
                            column_y_position: 540,
                            position:{
                                name:[148,718],
                                grn_no:[148,703],
                                mfg_date:[148,688],
                                container:[148,673],
                                qc_ref_no:[148,658],
                                holding_time_exp:[148,644],
                                reason_for_hold:[148,625,40],
                            }
                        }, 
                    ],                 
                ]
        },
        "sampled_data": {
            config:{
                font_size: 8
            },
            page_description:[
                [
                    {
                        column_x_position: 0,
                        column_y_position: 0,
                        position:{
                            name:[110,730],
                            code_no:[89,705],
                            grn_no:[212,705],
                            batch_lot_no:[98,680],
                            qc_ref_no:[222,680],
                            container:[98,655],
                            quantity:[224,655],
                            remarks:[83,631],
                            sample_by:[90,575],
                        }
                    },  
                    {
                        column_x_position: 271,
                        column_y_position: 0,
                        position:{
                            name:[110,730],
                            code_no:[89,705],
                            grn_no:[212,705],
                            batch_lot_no:[98,680],
                            qc_ref_no:[222,680],
                            container:[98,655],
                            quantity:[224,655],
                            remarks:[83,631],
                            sample_by:[90,575],
                        }
                    }, 
                          
                ],
                [
                    {
                        column_x_position: 0,
                        column_y_position: 268,
                        position:{
                            name:[110,730],
                            code_no:[89,705],
                            grn_no:[212,705],
                            batch_lot_no:[98,680],
                            qc_ref_no:[222,680],
                            container:[98,655],
                            quantity:[224,655],
                            remarks:[83,631],
                            sample_by:[90,575],
                        }
                    },  
                    {
                        column_x_position: 271,
                        column_y_position: 268,
                        position:{
                            name:[110,730],
                            code_no:[89,705],
                            grn_no:[212,705],
                            batch_lot_no:[98,680],
                            qc_ref_no:[222,680],
                            container:[98,655],
                            quantity:[224,655],
                            remarks:[83,631],
                            sample_by:[90,575],
                        }
                    }, 
                          
                ],
                [
                    {
                        column_x_position: 0,
                        column_y_position: 532,
                        position:{
                            name:[110,730],
                            code_no:[89,705],
                            grn_no:[212,705],
                            batch_lot_no:[98,680],
                            qc_ref_no:[222,680],
                            container:[98,655],
                            quantity:[224,655],
                            remarks:[83,631],
                            sample_by:[90,575],
                        }
                    },  
                    {
                        column_x_position: 271,
                        column_y_position: 532,
                        position:{
                            name:[110,730],
                            code_no:[89,705],
                            grn_no:[212,705],
                            batch_lot_no:[98,680],
                            qc_ref_no:[222,680],
                            container:[98,655],
                            quantity:[224,655],
                            remarks:[83,631],
                            sample_by:[90,575],
                        }
                    }, 
                          
                ],
              
            ]
        },
        "quarantined_data": {
            config:{
                font_size: 8
            },
            page_description:[
                [
                    {
                        column_x_position: 0,
                        column_y_position: 0,
                        position:{
                            name:[112,759],
                            batch_lot_no:[100,738],
                            challan_no:[227,738],
                            code_no:[88,714],
                            grn_no:[220,714],
                            supplier:[127,693],
                            container:[113,672],
                            quantity:[213,672],
                            mfg_date:[88,650],
                            exp_date:[213,650],
                            remarks:[86,629],
                        }
                    }, 
                    {
                        column_x_position: 257,
                        column_y_position: 0,
                        position:{
                            name:[112,759],
                            batch_lot_no:[100,738],
                            challan_no:[227,738],
                            code_no:[88,714],
                            grn_no:[220,714],
                            supplier:[127,693],
                            container:[113,672],
                            quantity:[213,672],
                            mfg_date:[88,650],
                            exp_date:[213,650],
                            remarks:[86,629],
                        }
                    }, 
                  
                          
                ],
                [
                    {
                        column_x_position: 0,
                        column_y_position: 267,
                        position:{
                            name:[112,759],
                            batch_lot_no:[100,738],
                            challan_no:[227,738],
                            code_no:[88,714],
                            grn_no:[220,714],
                            supplier:[127,693],
                            container:[113,672],
                            quantity:[213,672],
                            mfg_date:[88,650],
                            exp_date:[213,650],
                            remarks:[86,629],
                        }
                    }, 
                    {
                        column_x_position: 256,
                        column_y_position: 267,
                        position:{
                            name:[112,759],
                            batch_lot_no:[100,738],
                            challan_no:[227,738],
                            code_no:[88,714],
                            grn_no:[220,714],
                            supplier:[127,693],
                            container:[113,672],
                            quantity:[213,672],
                            mfg_date:[88,650],
                            exp_date:[213,650],
                            remarks:[86,629],
                        }
                    }, 
                  
                          
                ],
                [
                    {
                        column_x_position: 0,
                        column_y_position: 534,
                        position:{
                            name:[112,759],
                            batch_lot_no:[100,738],
                            challan_no:[227,738],
                            code_no:[88,714],
                            grn_no:[220,714],
                            supplier:[127,693],
                            container:[113,672],
                            quantity:[213,672],
                            mfg_date:[88,650],
                            exp_date:[213,650],
                            remarks:[86,629], 
                        }
                    }, 
                    {
                        column_x_position: 256,
                        column_y_position: 534,
                        position:{
                            name:[112,759],
                            batch_lot_no:[100,738],
                            challan_no:[227,738],
                            code_no:[88,714],
                            grn_no:[220,714],
                            supplier:[127,693],
                            container:[113,672],
                            quantity:[213,672],
                            mfg_date:[88,650],
                            exp_date:[213,650],
                            remarks:[86,629],
                        }
                    }, 
                  
                ],
            ]
        },
        "retested_data": {
            config:{
                font_size: 8
            },
            page_description:[
                [
                    {
                        column_x_position: 4,
                        column_y_position: 0,
                        position:{
                            name:[108,750],
                            code_no:[84,735],
                            grn_no:[204,735],
                            batch_lot_no:[96,722],
                            qc_ref_no:[213,722],
                            supplier:[124,710],
                            container:[102,697],
                            quantity:[202,696],
                            mfg_date:[84,684],
                            exp_date:[198,685],
                            initial_test:[102,672],
                            retest_date:[212,672],
                            potency:[82,656],
                            remarks:[82,643],
                        }
                    },  
                    {
                        column_x_position: 258,
                        column_y_position: 0,
                        position:{
                            name:[108,750],
                            code_no:[84,735],
                            grn_no:[204,735],
                            batch_lot_no:[96,722],
                            qc_ref_no:[213,722],
                            supplier:[124,710],
                            container:[102,697],
                            quantity:[202,696],
                            mfg_date:[84,684],
                            exp_date:[198,685],
                            initial_test:[102,672],
                            retest_date:[212,672],
                            potency:[82,656],
                            remarks:[82,643],
                        }
                    },          
                ],
                [
                    {
                        column_x_position: 4,
                        column_y_position: 269,
                        position:{
                            name:[104,752],
                            code_no:[82,739],
                            grn_no:[202,739],
                            batch_lot_no:[95,726],
                            qc_ref_no:[212,726],
                            supplier:[122,713],
                            container:[100,701],
                            quantity:[200,701],
                            mfg_date:[82,688],
                            exp_date:[196,688],
                            initial_test:[100,675],
                            retest_date:[210,675],
                            potency:[80,662],
                            remarks:[81,650],
                        }
                    },  
                    {
                        column_x_position: 258,
                        column_y_position: 269,
                        position:{
                            name:[104,752],
                            code_no:[82,739],
                            grn_no:[202,739],
                            batch_lot_no:[95,726],
                            qc_ref_no:[212,726],
                            supplier:[122,713],
                            container:[100,701],
                            quantity:[200,701],
                            mfg_date:[82,688],
                            exp_date:[196,688],
                            initial_test:[100,675],
                            retest_date:[210,675],
                            potency:[80,662],
                            remarks:[81,650],
                        }
                    },          
                ],
                [
                    {
                        column_x_position: 4,
                        column_y_position: 529,
                        position:{
                            name:[107,750],
                            code_no:[83,737],
                            grn_no:[203,737],
                            batch_lot_no:[96,724],
                            qc_ref_no:[213,724],
                            supplier:[127,711],
                            container:[101,699],
                            quantity:[201,699],
                            mfg_date:[83,686],
                            exp_date:[197,686],
                            initial_test:[101,673],
                            retest_date:[211,673],
                            potency:[81,660],
                            remarks:[82,648],
                        }
                    },  
                    {
                        column_x_position: 258,
                        column_y_position: 529,
                        position:{
                            name:[107,750],
                            code_no:[83,737],
                            grn_no:[203,737],
                            batch_lot_no:[96,724],
                            qc_ref_no:[213,724],
                            supplier:[127,711],
                            container:[101,699],
                            quantity:[201,699],
                            mfg_date:[83,686],
                            exp_date:[197,686],
                            initial_test:[101,673],
                            retest_date:[211,673],
                            potency:[81,660],
                            remarks:[82,648],
                        }
                    },          
                ],
            ]
        },
        "released_data": {
            config:{
                font_size: 8
            },
            page_description:[
                [
                    {
                        column_x_position: 0,
                        column_y_position: 0,
                        position:{
                            name:[116,766],
                            code_no:[91,748],
                            grn_no:[212,748],
                            batch_lot_no:[104,731],
                            qc_ref_no:[221,731],
                            supplier:[130,716],
                            container:[108,701],
                            quantity:[210,701],
                            mfg_date:[93,685],
                            exp_date:[210,685],
                            potency:[89,669],
                            retest_date:[212,669],
                            remarks:[91,653],
                        }
                
                    },
                    {
                        column_x_position: 257,
                        column_y_position: 0,
                        position:{
                            name:[116,766],
                            code_no:[91,748],
                            grn_no:[212,748],
                            batch_lot_no:[104,731],
                            qc_ref_no:[221,731],
                            supplier:[130,716],
                            container:[108,701],
                            quantity:[210,701],
                            mfg_date:[93,685],
                            exp_date:[210,685],
                            potency:[89,669],
                            retest_date:[212,669],
                            remarks:[91,653],
                        }
                
                    }
            
                ],
                [
                    {
                        column_x_position: 0,
                        column_y_position: 263,
                        position:{
                            name:[116,766],
                            code_no:[91,748],
                            grn_no:[212,748],
                            batch_lot_no:[104,731],
                            qc_ref_no:[221,731],
                            supplier:[130,716],
                            container:[108,701],
                            quantity:[210,701],
                            mfg_date:[93,685],
                            exp_date:[210,685],
                            potency:[89,669],
                            retest_date:[212,669],
                            remarks:[91,653],
                        }
                    },
                    {
                        column_x_position: 254,
                        column_y_position: 263,
                        position:{
                            name:[116,766],
                            code_no:[91,748],
                            grn_no:[212,748],
                            batch_lot_no:[104,731],
                            qc_ref_no:[221,731],
                            supplier:[130,716],
                            container:[108,701],
                            quantity:[210,701],
                            mfg_date:[93,685],
                            exp_date:[210,685],
                            potency:[89,669],
                            retest_date:[212,669],
                            remarks:[91,653],
                        }
                    }
            
                ],
                [
                    {
                        column_x_position: 0,
                        column_y_position: 528,
                        position:{
                            name:[116,766],
                            code_no:[91,748],
                            grn_no:[212,748],
                            batch_lot_no:[104,731],
                            qc_ref_no:[221,731],
                            supplier:[130,716],
                            container:[108,701],
                            quantity:[210,701],
                            mfg_date:[93,685],
                            exp_date:[210,685],
                            potency:[89,669],
                            retest_date:[212,669],
                            remarks:[91,653],
                        }
                    },
                    {
                        column_x_position: 254,
                        column_y_position: 528,
                        position:{
                            name:[116,766],
                            code_no:[91,748],
                            grn_no:[212,748],
                            batch_lot_no:[104,731],
                            qc_ref_no:[221,731],
                            supplier:[130,716],
                            container:[108,701],
                            quantity:[210,701],
                            mfg_date:[93,685],
                            exp_date:[210,685],
                            potency:[89,669],
                            retest_date:[212,669],
                            remarks:[91,653],
                        }
                    }
            
                ]
            ]
        },
        "rejected_data": {
            config:{
                font_size: 8
            },
            page_description:[
                [
                    {
                        column_x_position: 0,
                        column_y_position: 0,
                        position:{
                            name:[90,774],
                            code_no:[60,754],
                            grn_no:[195,754],
                            batch_lot_no:[75,737],
                            qc_ref_no:[205,737],
                            supplier:[108,720],
                            container:[79,704],
                            quantity:[195,704],
                            mfg_date:[60,686],
                            exp_date:[195,686],
                            potency:[63,668],
                            retest_date:[197,668],
                            remarks:[60,652],
                        }
                
                    },
                    {
                        column_x_position: 275,
                        column_y_position: 0,
                        position:{
                            name:[90,774],
                            code_no:[60,754],
                            grn_no:[195,754],
                            batch_lot_no:[75,737],
                            qc_ref_no:[205,737],
                            supplier:[108,720],
                            container:[79,704],
                            quantity:[195,704],
                            mfg_date:[60,686],
                            exp_date:[195,686],
                            potency:[63,668],
                            retest_date:[197,668],
                            remarks:[60,652],
                        }
                
                    }
            
                ],
                [
                    {
                        column_x_position: 0,
                        column_y_position: 271,
                        position:{
                            name:[90,774],
                            code_no:[60,754],
                            grn_no:[195,754],
                            batch_lot_no:[75,737],
                            qc_ref_no:[205,737],
                            supplier:[108,720],
                            container:[79,704],
                            quantity:[195,704],
                            mfg_date:[60,686],
                            exp_date:[195,686],
                            potency:[63,668],
                            retest_date:[197,668],
                            remarks:[60,652],
                        }
                
                    },
                    {
                        column_x_position: 275,
                        column_y_position: 271,
                        position:{
                            name:[90,774],
                            code_no:[60,754],
                            grn_no:[195,754],
                            batch_lot_no:[75,737],
                            qc_ref_no:[205,737],
                            supplier:[108,720],
                            container:[79,704],
                            quantity:[195,704],
                            mfg_date:[60,686],
                            exp_date:[195,686],
                            potency:[63,668],
                            retest_date:[197,668],
                            remarks:[60,652],
                        }
                
                    }
            
                ],
                [
                    {
                        column_x_position: 0,
                        column_y_position: 540,
                        position:{
                            name:[90,774],
                            code_no:[60,754],
                            grn_no:[195,754],
                            batch_lot_no:[75,737],
                            qc_ref_no:[205,737],
                            supplier:[108,722],
                            container:[79,704],
                            quantity:[195,704],
                            mfg_date:[60,691],
                            exp_date:[195,691],
                            potency:[60,672],
                            retest_date:[197,672],
                            remarks:[60,658],
                        }
                
                    },
                    {
                        column_x_position: 275,
                        column_y_position: 540,
                        position:{
                            name:[90,774],
                            code_no:[60,754],
                            grn_no:[195,754],
                            batch_lot_no:[75,737],
                            qc_ref_no:[205,737],
                            supplier:[108,722],
                            container:[79,704],
                            quantity:[195,704],
                            mfg_date:[60,691],
                            exp_date:[195,691],
                            potency:[60,672],
                            retest_date:[197,672],
                            remarks:[60,658],
                        }
                
                    }
            
                ]
            ]
        }
    }

let documentData = [];

page_data.forEach(page => {
    pageLayouts[layout]["page_description"] = pageLayouts[layout].page_description.map((row,row_i)=>{//Combining Page Data and the coordination.
        return row.map((col,col_i)=>{
            return {...col,...page[row_i][col_i]}
        })
    })

    
var pageData = pageLayouts[layout]["page_description"].map(row=>{

return row.map(col => {
if(col.is_visible==1){
return Object.keys(col.data).map(field => {
if(col.position[field][2] !== undefined && col.data[field].length > col.position[field][2]){
let regexp = new RegExp(".{1,"+ col.position[field][2]+"}","g")
// let lines = col.data[field].match(/.{1,25}/g)
let lines = col.data[field].match(regexp) //Multi Line functionality
return lines.map((line,line_key) => {
return `${col.position[field][0] + col.column_x_position} ${col.position[field][1] - col.column_y_position - (8 * line_key)} moveto
(${line}) show`;
}).join("\n\n")
}else{
return `${col.position[field][0] + col.column_x_position} ${col.position[field][1] - col.column_y_position} moveto
(${col.data[field]}) show`;
}

}).join("\n\n")
}else{
return "";
}
}).join("\n\n%----------------Column Separator--------------------------\n\n");
}).join("\n\n%=================Row Separator===========================\n\n");

documentData.push(pageData);
    
});

var docText = documentData.map(page=>{
let txt = `<< /PageSize [595 842] >> setpagedevice

${page}

showpage`
return txt;
}).join("\n\n%=================Page Separator===========================\n\n")

var text = `%!
/Helvetica findfont ${pageLayouts[layout]["config"].font_size} scalefont setfont
%============================================================

${docText} 

%_-_-_-_-_-_-_-_-_-_-_-_-_-End File_-_-_-_-_-_-_-_-_-_-_-_-_-

`

    return text;
}
