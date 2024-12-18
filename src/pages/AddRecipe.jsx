import { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AddRecipesAsync } from '../services/actions/recipe.action';
import { useNavigate } from 'react-router';
// import generateUniqueId from 'generate-unique-id';

const AddRecipe = () => {

    const {isSuccess, errMsg} = useSelector(state => state.RecipeReducers)

    const [formData, setFormData] = useState({
        resname: '',
        dishtype: '',
        preptime : '',
        nserving: '',
        ctime : '',
        recsteps : '',
        fname : '',
        lname : '' 
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {

        const { name, value, files } = e.target;
    
        if(name === "bimage" && files.length > 0){

            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () =>{
                
                setFormData((prevData) => ({
                    ...prevData,
                    [name] : reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }else{
            setFormData((prevData) => ({

                ...prevData,
                [name] : value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!formData.bTitle || !formData.author || !formData.pyear || !formData.bprice || !formData.bpages) {
        //     //alert("Please fill in all required fields");
        //     return;
        // }

        dispatch(AddRecipesAsync(formData));
        navigate('/');
    };

    useEffect(() => {
        if(isSuccess){
            navigate('/');
        }
    }, [isSuccess])

    return(
        <>
            <Container>
                <h1 className="mt-3 mt-5">Recipe Sharing System</h1><br />
                <h2 className='mb-5'>Adding Recipes</h2>

            {
                errMsg ? <h2 className='text-danger'>{errMsg}</h2>
                :
                <Form onSubmit={handleSubmit}>
                    <Row className='mb-3 justify-content-between'>
                        <Col md={5}>
                            <Form.Group controlId="resname">
                                <Form.Label>Recipe Name : </Form.Label>
                                <Form.Control type="text" placeholder="Enter Recipe Name" name="resname" value={formData.resname} onChange={handleChange} />
                            </Form.Group>
                        </Col>

                        <Col md={5}>
                            <Form.Group controlId="dishtype">
                                <Form.Label>Dish Type : </Form.Label>
                                <Form.Control type="text" placeholder="Enter Dish Type" name="dishtype" value={formData.dishtype} onChange={handleChange} />
                            </Form.Group>
                        </Col>

                        <Col md={8}>
                            <Form.Group controlId="preptime" className='mt-5'>
                                <Form.Label>Preparation Time : </Form.Label>
                                <Form.Control type="number" placeholder="Ex: 20 Mins" name="preptime" value={formData.preptime} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='my-5 justify-content-between'>
                        <Col md={7}>
                            <Form.Group controlId="nserving">
                                <Form.Label>No. of Servings : </Form.Label>
                                <Form.Control type="number" placeholder="Ex: 4" name="nserving" value={formData.nserving} onChange={handleChange} />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group controlId="ctime">
                                <Form.Label>Cooking Time : </Form.Label>
                                <Form.Control type="number" placeholder="Enter Cooking Time" name="ctime" value={formData.ctime} onChange={handleChange} />
                            </Form.Group>
                        </Col>

                        <Col md={5}>
                            <Form.Group controlId="fname" className='mt-5'>
                                <Form.Label>First Name : </Form.Label>
                                <Form.Control type="text" placeholder="Enter Your Name" name="fname" value={formData.fname} onChange={handleChange} />
                            </Form.Group>
                        </Col>

                        <Col md={5}>
                            <Form.Group controlId="lname" className='mt-5'>
                                <Form.Label>Last Name : </Form.Label>
                                <Form.Control type="number" placeholder="Enter Last Name" name="lname" value={formData.lname} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='my-5'>
                        <Col md={12}>
                            <Form.Group controlId="recsteps">
                                <Form.Label>Book Information : </Form.Label>
                                <textarea className='form-control' rows="2" cols="5" type="text" placeholder="Enter Recipe Steps" name="recsteps" value={formData.recsteps} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">Add Book</Button>
                </Form>
            }
            </Container>
        </>
    )
}
export default AddRecipe;