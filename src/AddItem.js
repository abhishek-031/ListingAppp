import React from 'react';

class AddItem extends React.Component{

  constructor(props){
    super(props);
    this.state={
      item:'',
      valid:false
    }
    this.onItemChange=this.onItemChange.bind(this);
  }

  onItemChange(event){
    this.setState({item:event.target.value});
    if(this.props.items!==null){
    if(event.target.value==='' || this.props.items.find(item=>{ return item===event.target.value})!==undefined){
      this.setState({valid:false});
    }
    else{
      this.setState({valid:true});
    }
  }
  else{
    if(event.target.value==='')
    {
      this.setState({valid:false});
    }
    else{
      this.setState({valid:true});
    }
  }
  }

  render(){
    let inputStyle={border:"2px solid black"},errorMessage='',submitBtn='',backbtn='';
    if(!this.state.valid){
      inputStyle={border: "2px solid red"};
      errorMessage='The value entered is empty or already exists';
    }
    else{
      if(this.props.editing==='no')
      submitBtn=(<button type='submit'>Add Item</button>);
      else
      submitBtn=(<button type='submit'>Update</button>)
    }
    if(this.props.editing==='yes'){
      backbtn=(
        <button id='backBtn' onClick={this.props.backFromEditing}>Back</button>
      );
    }
    else{
      backbtn=(
        <button id='backBtn' onClick={this.props.backFromAdd}>Back</button>
      );
    }
    return (<div>
      <form onSubmit={()=>{this.props.addItem(this.state.item)}}>
        <p>{errorMessage}</p>
        <input onKeyPress={(e)=>{e.key==='Enter' && e.preventDefault()}} style={inputStyle} value={this.state.item} onChange={(event)=>{this.onItemChange(event)}} />
        {submitBtn}
      </form>
      {backbtn}
    </div>);
  }
}

export default AddItem;