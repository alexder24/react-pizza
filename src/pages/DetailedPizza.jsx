import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const detailedPizzaApi = 'https://67270754302d03037e6f186e.mockapi.io/items/';

export default function DetailedPizza() {
	const [pizza, setPizza] = useState();
	const { id } = useParams();
	const navigate = useNavigate();
	
	const getPizza = useCallback(async (id) => {
		const query = `${detailedPizzaApi + id}`;
		try {
			const { data } = await axios.get(query);
			setPizza(data);
		} catch(e) {
			alert('Ошибка при загрузке данных');
			console.error(e);
			navigate('/');
		}
	}, [navigate]);
	
	useEffect(() => {
		getPizza(id);
	}, [id, getPizza]);

	if (!pizza) return (<div>Идет загрузка...</div>);

	return (
		<>
			<div className="pizza-block pizza-block_detailed">
				<img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
				<h4 className="pizza-block__title">{pizza.title}</h4>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {pizza.price} ₽</div>
				</div>
			</div>
			<Link className="button button--black pizza-block_button" to="/">Назад</Link>
		</>
	);
}