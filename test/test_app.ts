import * as assert from "assert";
import axios from "axios";
import * as sinon from "sinon";


// Fake Behavior 

describe("study_sinon fake api",()=>{

    function once(fn:Function){
        let returnValue :any, called_ :boolean = false;
        return function(){
            if(!called_){
                called_ = true;
                returnValue = fn.apply(this,arguments);
            }
            return returnValue;
        }
    }

    it("calls the original function",()=>{
        let callback = sinon.fake();
        let proxy = once(callback);
    
        console.log(`callback : ${callback}`);
        console.log(`proxy : ${proxy}`);
        proxy();
    
        assert(callback.called);
    })

    it("calls the original function only once",()=>{
        let callback = sinon.fake();
        let proxy = once(callback);

        proxy();
        proxy();

        assert(callback.calledOnce);
    })

    it("calls original function with right this and args",()=>{
        let callback = sinon.fake();
        let proxy    = once(callback);
        let obj      = {};

        proxy.call(obj,1,2,3);

        assert(callback.calledOn(obj));
        assert(callback.calledWith(1,2,3));
    })

    it("returns the return value from the original function",()=>{
        let callback = sinon.fake.returns(42);
        let proxy    = once(callback);
        assert.strictEqual(proxy(),42);
    })
})

//  Behavior 

describe('Testing the todos HTTP call', () => {
    let stub :any;
  
    const getAllTodos = (url:any) => {
        return axios.get(url).then(response => response);
      };
      
    const mockedResponseObj = {
      userId: 1,
      id: 1,
      title: 'This is title',
      completed: true,
    };
  
    beforeEach(() => {
      stub = sinon.stub(axios, 'get').resolves(mockedResponseObj);
    });
  
    afterEach(() => {
      stub.restore();
    });
  
    it('should return all todos with the right properties', done => {
      getAllTodos('tests').then(res => {
            console.log(res);
      });
      done();
    });
  });


