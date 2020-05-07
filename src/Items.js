import React from 'react';
import AddItem from './AddItem';

class Items extends React.Component{

  constructor(props){
    super(props);
    this.state={
      editing:false,
      editingItem:''
    };
    this.getItem=this.getItem.bind(this);
  }

  backFromEditing(){
    this.setState({editing:false});
  }

  editHandler(item){
    this.setState({editing:true,
    editingItem:item});
  }

  getItem(item){
    this.props.updateItem(this.state.editingItem,item);
    this.setState({
      editing:false,
      editingItem:''
    })
  }


  render(){

    let view;
    let list;
    if(this.props.items !== null){
      list = (<ol>
        {this.props.items.map(item=>{
          return (
            <li key={item}><span>{item}</span> <button onClick={()=>{this.props.delete(item)}}>Delete</button> <button onClick={()=>{this.editHandler(item)}}>Edit</button></li>
          );
        })}
      </ol>);
    }
    else{
      list='';
    }
    if(this.state.editing){
      view=(
        <div className='adding'>
        <h2>Edit Item: {this.state.editingItem} </h2>
        <AddItem backFromEditing={()=>{this.backFromEditing()}} items={this.props.items} editing='yes' addItem={this.getItem} />
        </div>
      );
    }
    else{
      view=(
        <div className='items'>
          <div className="items-head">
            <h2>Your Items are:</h2>
            <button onClick={()=>{this.props.addItem()}}>Add Item</button>
            </div>
        {list}
      </div>
      );
    }

    return(
      <div>
      {view}
      </div>
    )
  }
}

export default Items;