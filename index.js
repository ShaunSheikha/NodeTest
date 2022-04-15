const EventEmitter = require('events');
const fs = require('fs');
const os = require('os');
const path = require('path');
const axios = require('axios').default;

const testObject = {
    name: 'Test Object',
    value: 42,
    test: 'hooblagadoobadoo'
}
function TestObject(){
    console.log('The Test Object by itself: ');
    console.log(testObject);
    console.log('The Test Object stringified:\n'  + JSON.stringify(testObject));
    console.log(`The Test Object in a template string\n ${testObject}`);
}
function BasicPath(){
    console.log("The directory name is: " + __dirname + '\n');
    console.log('The File name is: ' + __filename + '\n');
}
//Path info
function Path(testPath = './testFile.txt'){
    console.log('Path Test');
    if(!fs.existsSync(testPath)){
        console.log(`The Path ${testPath} doesn't exist`);
    }else{
        console.log(`Dirname: ${path.dirname(testPath)}`);
        console.log(`Basename: ${path.basename(testPath, '.txt')}`);
        console.log(`Extension: ${path.extname(testPath)}`);
    }
}
//create a text file
function FileSystemsFile(fileName = 'testFile'){
    console.log('Creating Text File Test: ');
    if(fs.existsSync(`./${fileName}.txt`)){
        console.log(`File ${fileName} already exists here!`);
        return
    }
    else{
        console.log(`Creating file ${fileName}`)
        fs.open(`${fileName}.txt`,'w+', (err,fd)=>{
            if(err){
                console.error(err);
                return
            }
            console.log('file opened');
            fs.writeFileSync(`${fileName}.txt`, 'I am a new file!' + os.EOL)
            console.log(fs.statSync(`${fileName}.txt`));
            console.log(`closing file with fd ${fd}`);
            
            fs.close(fd); 
        });
    }
}
//create a directory
function FileSystemsDirectory(directoryName = 'NewFolder'){
    let testDirectory = path.join('./', directoryName);
    console.log(`Checking if directory named ${directoryName} exists...`);
    try{
        if(!fs.existsSync(testDirectory)){
            console.log(`Creating Directory ${testDirectory}`)
            fs.mkdirSync(testDirectory);
        }
        else{
            console.log(`The Directory ${testDirectory} Already Exists!`);
            console.log(`Located at: ${path.join(path.dirname(testDirectory),path.basename(directoryName))}`);
        }
    }catch(e){
        console.log(e);
    }
}
//write to testFile.txt
function FileSystemsWrite(text = 'Test Content!',file = 'testFile',overwrite = true){
    console.log('Write to File: ');
    let testPath = path.join('./', `${file}.txt`);
    let optionWriteAtEnd = {flag: 'a+'};
    let optionWriteAtBeginning = {flag: 'w+'};
    
    console.log(`Checking if ${testPath} exists`);
    if(!fs.existsSync(testPath)){
        console.log(`The file ${file} does not exist`);
    }
    else{
        if(overwrite){
            fs.writeFileSync(testPath, text);
        }
        else{
            fs.appendFileSync(testPath, text);
        }
        console.log(`Content Written: ${text}`);
    }
}
//Operating System Info
function OperatingSystemInfo(){
    console.log('Operating System Info' + os.EOL)
    console.log(`Host Name: ${os.hostname()}`);
    console.log(`OS: ${os.type()} - ${os.release()}`);
    console.log(`Platform: ${os.platform()}`);
    console.log(`Total Memory: ${(os.totalmem()/1073741824).toFixed(2)} GB`);
    console.log(`Free Memory: ${(os.freemem()/1073741824).toFixed(2)} GB`);
    console.log(`Home Directory: ${os.homedir()}`);
    console.log(`Temp Directory: ${os.tmpdir()}`);
    console.log(`Architecture: ${os.arch()}`);
    console.log(`CPUS: ${os.cpus(0).length} - ${os.cpus()[0].model}`);
    console.log(`Uptime: ${os.uptime()}`);
    console.log(`The Delimiter: ${JSON.stringify(os.EOL)}`);
    console.log(`Endianness: ${os.endianness()}`);
    console.log(`Networks: ${Object.keys(os.networkInterfaces()).length}`);
    /* console.log(`Signals: `);
    console.log(os.constants.signals); */
    //console.log(os.networkInterfaces());
}
function Events(){
    console.log('Events ' + os.EOL);

    const testEmitter = new EventEmitter();
    testEmitter.on('one', function OneHandler(){
        console.log('One Emitted!');
    });
    testEmitter.on('one', ()=>{
        console.log('Another One Emitted!');
    });
    testEmitter.on('two', function TwoHandler(a,b){
        console.log('Two Emitted!');
        console.log(a, b);
    });
    console.log(testEmitter.listeners('one'));
    
    testEmitter.emit('one');
    testEmitter.emit('two', 'oopsie', 'daisy');
    

}
async function CallServer(){
    console.log('Call server' + os.EOL);
    
    let base = 'http://localhost:8090'
    let paramQuery = 'http://localhost:8090/parameterAndQuery/7/5/?queryKey=queryValue&otherKey=otherValue';
    
    //GET
    axios({
        method: 'GET',
        url: base

    })
    .then((res)=>{
        console.log(`Status of GET Home- ${res.status}`);
        console.log(res.data);
        console.log();
    })
    .catch((err)=>{
        console.log(err.response.status);
    })

    //POST
    axios({
        method: 'POST',
        url: base,
        headers: {'Content-Type': 'application/json'},
        data: {bodyKey: 'bodyValue'}
        
    })
    .then(res=>{
        console.log(`Status of POST Home- ${res.status}`);
        console.log(res.data);
        console.log();
    })
    .catch((err)=>{
        console.log(err.response.status);
    })

    //GET Gimme Endpoint
    axios({
        method: 'GET',
        url: 'http://localhost:8090/gimme',
        data: testObject
    })
    .then((res) =>{
        console.log(`Status of GET Gimme - ${res.status}`)
        console.log(res.data);
        console.log('');
    })
    .catch((err)=>{
        console.log(err.response.data + ' - Status - ' + err.response.status);
    })

    //POST with Parameters, Query, and Body
    axios({
        method: 'POST',
        url: paramQuery,
        data: testObject
    })
    .then((res)=>{
        console.log(res.data + ' - Status - ' + res.status);
    })
    .catch((err)=>{
        console.log(err.response.data)
    })


}

console.log('Node Testing' + os.EOL);

CallServer();