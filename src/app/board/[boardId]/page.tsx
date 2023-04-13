'use client'
import Card from '@/components/Card';
import React, {useState, useEffect} from 'react'
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd'

type PageProps = {
    params: {
        boardId: string,
    }
}

function page({ params: { boardId } } : PageProps) {

    const [board, setBoard] = useState<BoardType>();
    const [cardProps, setCardProps] = useState<CardProps[]>([]);
    const [cards, setCards] = useState<CardType[]>([]);

    // fetch boards list
    const fetchBoard = async () => {
        const res = await fetch(`/api/boards?id=${boardId}`);
        const data: BoardType = await res.json();
        return data;
    }
    
    // fetch card list
    const fetchCards = async () => {
        const res = await fetch(`/api/cards?boardid=${boardId}`);
        const data: CardType[] = await res.json();
        return data;
    }
    
    // fetch card items by card id
    const fetchCardItems = async (cardId: string) => {
        const res = await fetch(`/api/cardItems?cardid=${cardId}`);
        const data: CardItemType[] = await res.json();
        return data;
    }

    useEffect(() => {
        fetchBoard().then(data => {
            setBoard(data);
            const mainPage = document.getElementById('main-page');
            if (mainPage) {
                mainPage.style.background = ``;
                mainPage.style.backgroundImage = ``;
                const { isImage } = data.background;
                if (!isImage) {
                    const { isGradient } = data.background.color;
                    if (!isGradient) {
                        const { simple } = data.background.color;
                        mainPage.style.background = `${simple}`
                    } else {
                        const {gradient} = data.background.color;
                        const linearGradient = `linear-gradient(to right, ${gradient?.from}, ${gradient?.to})`;
                        mainPage.style.background = linearGradient;
                    }
                }
            }
        });

        // get card props (the card and its items)
        fetchCards().then((cards) => {
            cards.sort((a, b) => {
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0
            });
            cards.forEach(card => {
                fetchCardItems(card.id).then(cardItems => {
                    setCardProps(prev => [...prev, { card: card, items: cardItems }]);
                });
            });
        });

    }, [boardId]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        // unknown destination
        if (!destination) return;

        if (destination?.droppableId === source.droppableId
            && destination.index === source.index) {
            return;
        }

        // card id
        const dCardId = destination?.droppableId;
        const sCardId = source?.droppableId;
        // card item id
        const cardItemId = draggableId;
        // current card
        const sCard = cardProps.find(cardProp => cardProp.card.id === sCardId);
        const dCard = cardProps.find(cardProp => cardProp.card.id === dCardId);
        if (!sCard || !dCard) return;
        
        // when users drop the item in the same source and destination
        // reordering indexes of the card items
        if (destination.droppableId === source.droppableId) {
            // reorder indexes
            const items = reorderItems(sCard.items, source.index, destination.index);

            // update items in cards
            setCardProps(prev => prev.map(cardProp => (
                cardProp.card.id === sCardId ?
                {...cardProp, items} :
                cardProp
            )));

            console.log('in the same source')
        }
        // users drop the item in another card
        // updating and moving carditem to the destination card
        else {

            const result = moveItems(sCard.items, dCard.items, source, destination);
            setCardProps(prev => prev.map(cardProp => {
                if (cardProp.card.id === sCardId)
                    return {...cardProp, items: result['s']}
                if (cardProp.card.id === dCardId)
                    return {...cardProp, items: result['d']}
                return cardProp;
            }));

            console.log('in another source')
        }
    }

    // init items index
    const reInitIndex = (array: CardItemType[]) => {
        return array.map((item, index) => ({...item, index}));
    }

    // reorder items
    const reorderItems = (data: CardItemType[], sIndex: number, eIndex: number) => {
        const result = Array.from(data);
        const [removed] = result.splice(sIndex, 1);
        result.splice(eIndex, 0, removed);
        // result with item index reorder from 0 
        return reInitIndex(result);
    }

    // move items
    const moveItems = (source: CardItemType[], destination: CardItemType[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {
            's': reInitIndex(sourceClone),
            'd': reInitIndex(destClone)
        };

        return result;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <div className={`flex p-5 gap-6 w-full h-full bg-transparent border-l border-slate-200 dark:border-slate-700 top-0 left-0 bottom-0 right-0`}>
                { cardProps.map(cardProp => <Card data={cardProp} key={cardProp.card.id} />) }
            </div>
        </DragDropContext>
    )
}
  
export default page