'use client';

import { FC } from 'react';

interface NoteContentProps {}

const NoteContent: FC<NoteContentProps> = ({}) => {
	return (
		<div className='mt-2 flex flex-col gap-4 rounded-md bg-gray-100 p-4'>
			<p className='text-2xl font-semibold'>Temat: Kopce Binarne</p>
			<p className='text-xl font-semibold'>Geneza powstania</p>
			<ol>
				<p className='font-semibold'>Autorzy:</p>
				<li>- Foo Bar</li>
				<li>- John Smith</li>
				<li>- Bill Gates</li>
			</ol>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores vel
				quidem autem voluptate veniam illum harum repellendus ullam deleniti,
				officiis nobis optio nam nesciunt, ducimus numquam recusandae sequi,
				esse a beatae voluptatibus rem aut unde. Itaque officia labore nemo
				consequatur.
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
				necessitatibus molestias, quo et magnam in aliquam explicabo numquam!
				Ipsum natus sapiente accusamus exercitationem, voluptatem quisquam
				itaque maiores similique ipsa sunt adipisci, alias molestiae eos minus
				ratione distinctio vitae aspernatur quo iure necessitatibus sint
				deserunt? Quam ut ad iste deserunt, nemo numquam minus voluptates,
				laudantium officia quos illo at, fugit eveniet! Dignissimos ipsam
				aliquid accusamus et magnam sit, illo odio itaque expedita reiciendis,
				non similique molestiae ipsum possimus repudiandae necessitatibus
				temporibus sunt magni labore delectus ducimus vero. Doloribus repellat
				veniam sint enim praesentium.
			</p>
		</div>
	);
};

export default NoteContent;
