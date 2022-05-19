import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {

    const [meals, setMeals] = useState([])

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(process.env.REACT_APP_FIREBASE_DATABASE) //replace with your database link
            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }

            setMeals(loadedMeals);
        }

        fetchMeals()

    }, [])

    const mealsList = meals.map(m => (
        <MealItem
            key={m.id}
            id={m.id}
            name={m.name}
            description={m.description}
            price={m.price}
        />));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals