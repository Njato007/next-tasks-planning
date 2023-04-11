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

type FileUploaded = {
    data_url: string,
    file: File
}