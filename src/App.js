import React from 'react';
import Items from './Items';
import AddItem from './AddItem';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      adding:false,
      update:false
    }
  }

  setItems(items){
    localStorage.setItem('items',JSON.stringify(items));
  }

  addItem(){
    this.setState({adding:true});
  }

  backFromAdd(){
    this.setState({adding:false});
  }

  addItemToArray(item){
    this.setState({adding:false});
    if(localStorage.getItem('items')===null){
      let arr=[item];
      this.setItems(arr);
    }
    else{
      let arr=JSON.parse(localStorage.getItem('items'));
      arr.push(item);
      this.setItems(arr);
    }
    console.log(localStorage.getItem('items'));
  }

  delete(item){
    let arr=JSON.parse(localStorage.getItem('items'));
    let itemsAfterDel= arr.filter((itemVal)=>{return itemVal!==item});
    localStorage.setItem('items',JSON.stringify(itemsAfterDel));
    this.setState(state=>({update:!state.update}));
  }

  updateItem(item,newItem){
    let arr=JSON.parse(localStorage.getItem('items'));
    for(let i=0;i<arr.length;i++){
      if(arr[i]===item){
        arr[i]=newItem;
        break;
      }
    }
    localStorage.setItem('items',JSON.stringify(arr));
    this.setState(state=>({update:!state.update}));
  }

  render(){
    let view;
    if(this.state.adding){
      view=(
        <div className='adding'>
          <h2>Add Item to Your List</h2>
          <AddItem editing='no' backFromAdd={()=>{this.backFromAdd()}} addItem={(item)=>{this.addItemToArray(item)}} items={JSON.parse(localStorage.getItem('items'))} />
        </div>
      );
    }
    else{
      view=(
      <div>
        <Items items={JSON.parse(localStorage.getItem('items'))} updateItem={(item,newItem)=>{this.updateItem(item,newItem)}} delete={(item)=>{this.delete(item)}} addItem={()=>{this.addItem()}}/>
      </div>);
    }
    return (
      <div className='container'>
        {view}
      </div>
    );
  }
}

export default App;