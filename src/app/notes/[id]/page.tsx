const Task = ({
	title,
	description,
	priority,
	date,
}: {
	title: string;
	description: string;
	priority: number;
	date: string;
}) => {
	return (
		<div className='bg-gray-100 rounded-md p-4 flex flex-col gap-2 relative'>
			<p className='text-xl font-semibold'>{title}</p>
			<p>{description}</p>
			<div className='flex gap-2 items-center'>
				<div className='w-4 h-4 rounded-full bg-green-500'></div>
				<p className='bg-gray-200 rounded-md min-w-16 px-1 h-6 leading-6'>
					{date}
				</p>
			</div>
			<button className='w-8 h-8 top-0 right-0 bg-gray-200 rounded-md absolute'>
				❌
			</button>
		</div>
	);
};

const TASKS = [
	{
		id: 1,
		title: 'Task 1',
		description: 'Description 1',
		course: 'Course 1',
		priority: 1,
		date: '12.12.2024',
	},
	{
		id: 2,
		title: 'Task 2',
		description: 'Description 2',
		course: 'Course 2',
		priority: 2,
		date: '13.12.2024',
	},
	{
		id: 3,
		title: 'Task 3',
		description: 'Description 3',
		course: 'Course 3',
		priority: 3,
		date: '14.12.2024',
	},
	{
		id: 4,
		title: 'Task 4',
		description: 'Description 4',
		course: 'Course 4',
		priority: 4,
		date: '15.12.2024',
	},
	{
		id: 5,
		title: 'Task 5',
		description: 'Description 5',
		course: 'Course 5',
		priority: 5,
		date: '16.12.2024',
	},
];

const page = () => {
	return (
		<div className='w-full min-w-[800px] p-4 flex gap-4'>
			{/* left column: */}
			<div className='flex-1'>
				<h1 className='text-xl font-semibold'>
					Algorytmy i Struktury Danych (10.02.2024)
				</h1>
				{/* markdown: */}
				<div className='bg-gray-100 rounded-md p-4 flex flex-col gap-4 mt-2'>
					<p className='text-2xl font-semibold'>Temat: Kopce Binarne</p>
					<p className='text-xl font-semibold'>Geneza powstania</p>
					<ol>
						<p className='font-semibold'>Autorzy:</p>
						<li>- Foo Bar</li>
						<li>- John Smith</li>
						<li>- Bill Gates</li>
					</ol>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
						vel quidem autem voluptate veniam illum harum repellendus ullam
						deleniti, officiis nobis optio nam nesciunt, ducimus numquam
						recusandae sequi, esse a beatae voluptatibus rem aut unde. Itaque
						officia labore nemo consequatur.
					</p>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat
						excepturi voluptatibus mollitia quibusdam, at ducimus. Doloribus
						asperiores voluptatibus perspiciatis illo, laborum enim accusantium
						aliquid aperiam.
					</p>
					<p className='text-xl font-semibold'> Lorem ipsum dolor sit amet.</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
						distinctio porro itaque tenetur placeat error illum maiores
						necessitatibus molestias, quo et magnam in aliquam explicabo
						numquam! Ipsum natus sapiente accusamus exercitationem, voluptatem
						quisquam itaque maiores similique ipsa sunt adipisci, alias
						molestiae eos minus ratione distinctio vitae aspernatur quo iure
						necessitatibus sint deserunt? Quam ut ad iste deserunt, nemo numquam
						minus voluptates, laudantium officia quos illo at, fugit eveniet!
						Dignissimos ipsam aliquid accusamus et magnam sit, illo odio itaque
						expedita reiciendis, non similique molestiae ipsum possimus
						repudiandae necessitatibus temporibus sunt magni labore delectus
						ducimus vero. Doloribus repellat veniam sint enim praesentium.
					</p>
				</div>
			</div>
			{/* right column: */}
			<div className='w-48 flex flex-col gap-8'>
				{/* lessons: */}
				<div className='flex flex-col gap-2'>
					<p className='font-semibold text-xl'>Lessons:</p>
					<div className='bg-gray-100 text-center rounded-md'>
						Mon 03.03.2024
					</div>
					<div className='bg-gray-100 text-center rounded-md'>
						Mon 10.03.2024
					</div>
					<div className='bg-gray-100 text-center rounded-md'>
						Mon 17.03.2024
					</div>
					<div className='bg-pink-700 text-white text-center rounded-md'>
						Mon 24.03.2024
					</div>
					<div className='bg-gray-100 text-center rounded-md'>
						Tue 25.03.2024
					</div>
				</div>
				{/* tasks: */}
				<div className='flex flex-col gap-2'>
					<p className='font-semibold text-xl'>Tasks:</p>
					{TASKS.map(task => (
						<Task key={task.id} {...task} />
					))}
					<button className='bg-gray-100 w-full text-center rounded-md h-10 leading-10 font-semibold'>
						+ Create a new task
					</button>
				</div>
				<div className='flex flex-col gap-2'>
					<p className='font-semibold text-xl'>Teacher:</p>
					<div>Profesor Andrew Huberman</div>
				</div>
			</div>
		</div>
	);
};

export default page;
