import React, { useState, useEffect } from 'react'
// import Editmodal from './Editmodal';


function Form() {
    const [credential, setCredential] = useState([]);
    const [array, setArray] = useState([]);
    const [handleeffect,setHandleeffect]=useState(false)
    const [edit, setEdit] = useState({});
    const [users, setUsers] = useState({
      
        firstname:"",
        lastname:"",
        email:""
    });
    const [css, setCss] = useState({
        "modeltop":"-100%",
        "Addtop":"-100%"
    })
    

    const searchbox=(e)=>{
        // setSearch(e.target.value);
        if(e.target.value!==""){
            setCredential( array.filter((list)=>{

            return list.firstname.toLowerCase().includes(e.target.value.toLowerCase())
            }))
           }else{
               setCredential(array)
           }
       
    }


    const searchitems=()=>{
  
    }
    

    const INPUT = (e) => {
        e.preventDefault();
        setUsers({ ...users, [e.target.name]: e.target.value });
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(users.firstname,users.lastname,users.email)
        if(users.firstname==="" || users.lastname==="" || users.email===""){
            alert("Fields can't be empty")
        }else{
            setArray([...array,{ id: new Date().getTime().toString(), firstname: users.firstname, lastname: users.lastname, email: users.email }]);
            setCss ({...css,["Addtop"]:"-100%"})

        }}

    const Edit=(id)=>{
        setCss ({...css,["modeltop"]:"0%"})
        console.log(css)
        let user={}
        user=credential.filter((ele)=>ele.id===id)
           setEdit(...user)
    }

    const Delete=(id)=>{
        // console.log(credential)
        let newitems
       newitems= credential.filter((ele)=>ele.id!==id)
       setArray(newitems)
      
        console.log(credential)
    }

    const handlechange=(e)=>{
       setEdit({...edit,[e.target.name]:e.target.value})
    }

    const addNew=()=>{
        credential.filter((ele)=>{
            if(ele.id===edit.id){
                ele.firstname = edit.firstname;
                ele.lastname = edit.lastname
                ele.email = edit.email
                // setArray(credential)
                setHandleeffect(!handleeffect)
                // console.log(credential,array)
            }
        })
    }

    useEffect(() => {
        setCredential(array)

    }, [array,handleeffect])

    const Add=()=>{
        setCss ({...css,["Addtop"]:"0%"})


    }
    const cancel=()=>{
       setCss ({...css,["modeltop"]:"-100%"})
        console.log(css)
    }


    return (
        <div className="maindiv">
            {/* <Editmodal edituser={edit}/> */}
            <h1 className="heading">Crud Operations</h1>
            <button className="add" onClick={Add}>Add</button>
            <input className="search" 
             onChange={ searchbox} placeholder="Enter to search"/><span><button className="searchbtn" onClick={searchitems}>Search</button></span>
            
            <form style={{top:css["Addtop"]}}  >
                <div className="form">
                    <div className="Element">
                        <label>First Name :</label>
                        <input type="text" className="frstname" name="firstname" onChange={INPUT} placeholder="Enter your first name"  />
                    </div>
                    <div className="Element">
                        <label>Last Name :</label>
                        <input type="text" className="lastname "  name="lastname" onChange={INPUT} placeholder="Enter your last name"  />
                    </div>
                    <div className="Element">
                        <label>Email   ID :</label>
                        <input type="text" className="email"  name="email" onChange={INPUT} placeholder="Enter your Email "  />
                    </div>
                    <div>
                        <input className="Submit" type="button" value="Submit" onClick={submit} />
                    </div>
                </div>
            </form>
             
            <table  className="list">
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>E-mail</th>
                        <th colSpan="2">Edit/Delete</th>

    </tr>
                    {
                        credential.map((users) => {
                            return (
                                
                                <tr>

                                    <td>{users.firstname}</td>
                                    <td>{users.lastname}</td>
                                    <td>{users.email}</td>
                                    <td type="button" className="editbtn" onClick={()=>{Edit(users.id)}}>Edit</td>

                                    <td type="button" className="deletebtn" onClick={()=>Delete(users.id)}>Delete</td>
                                </tr>
                               
                            )
                        })
                    }

                </tbody>
            </table>

            {/* For Editmodal */}
            <div className="editmodel" style={{top:css["modeltop"]}}>
            <div className="editholder" style={{backgroundColor:'grey'}}>
                <div>
                    <label htmlFor="Fname" style={{fontWeight:'bold',marginBottom:4}}>First Name:</label>
                    <input type="text" style={{padding:4}} value={edit.firstname} id="Fname" name="firstname"  onChange={handlechange} />
                    
                </div>
                <div>
                    <label htmlFor="Lastname" style={{fontWeight:'bold',marginBottom:4}}>Last Name:</label>
                    <input type="text" style={{padding:4}} value={edit.lastname} name="lastname"  onChange={handlechange} id="Lastname"/>
                </div>
                <div>
                    <label htmlFor="email" style={{fontWeight:'bold',marginBottom:4}}>Email:</label>
                    <input type="email" style={{padding:4}} value={edit.email} name="email"  onChange={handlechange} id="email"/>
                </div>
            </div>
                <div style={{marginTop:20,backgroundColor:'none'}}>
                    <button style={{backgroundColor:'black',color:'white'}} onClick={addNew}>Save</button>
                    <button  style={{backgroundColor:'red',color:'white',margin:'0px 5px'}} onClick={cancel}>Cancel</button>
                </div>
            
        </div>





        </div>
    )
}

export default Form
