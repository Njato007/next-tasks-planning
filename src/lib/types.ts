type BoardType = {
    id: string,
    name: string,
    creator: string,
    background: {
        isImage: boolean,
        image: string,
        color: {
            isGradient: boolean,
            gradient?: {
                from?: string,
                to?: string
            }
            simple?: string
        }
    },
    createAt?: Date,
    editedAt?: Date,
}

type CardProps = {
    card: CardType,
    items: CardItemType[]
}

type CardType = {
    id: string,
    boardId: string,
    title: string
}

type CardItemType = {
    id: string,
    cardId: string,
    index: number,
    title: string,
    theme: string,
    creation: Date,
    progress: number,
    users: Array<string>
}

type FileUploaded = {
    data_url: string,
    file: File
}