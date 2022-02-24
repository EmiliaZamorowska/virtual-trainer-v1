import React,  {useState} from "react";
import {useDispatch} from 'react-redux';
import {deleteExercise} from '../../actions/exercises';
import Button from '@material-ui/core/Button';

function Exercise({exercise, setCurrentId, setFilter}){
    const dispatch = useDispatch();
    const [fullView, setfullView] = useState(false);
    return(
        <>
        <div className="exerciseElement">
        <h3 className="exTitle" style={{cursor:'pointer'}} onClick={() => setfullView(!fullView)}> {exercise.title} </h3>
        
        {fullView ?  
            <div className="exerciseElementBody">
            <div>
                <h5> {exercise.createdAt.substring(11,16)} </h5>
                <h4> {exercise.tags.map((tag, index) => <li style={{cursor:'pointer'}}onClick={()=>setFilter(tag)} className="tag" key={index}>{tag}</li>)}</h4>
            </div>
            <div>
                <h4> Ciężar: {exercise.weight }</h4>
                <h4> Serie: {exercise.sets }</h4>
                <h4> Powtórzenia: {exercise.reps }</h4>
            </div>
                <div className="exerciseButtons">
                    <p></p><Button color='primary' variant="contained" type="button" onClick={()=>setCurrentId(exercise._id)}>Edytuj</Button>
                    <p></p><Button color='warning' variant="contained" type="button" style={{fontWeight: 'bold'}} onClick={() => dispatch(deleteExercise(exercise._id))}>Usuń</Button>
                </div></div>  : ''}
            {exercise.notes ? exercise.notes : ''}
            </div>
        </>
    );
}

export default Exercise;