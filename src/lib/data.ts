export const Data: BoardType[] = [
    {
      id: '0001', name: 'Connection with Firebase', creator: 'njato@gmail.com',
      background: {
        isImage: false,
        color: {
          isGradient: false,
          simple: '#FFFFFF'
        },
        image: ''
      }
    },
    {
      id: '0003', name: 'Creating React App', creator: 'njato@gmail.com',
      background: {
        isImage: false,
        color: {
          isGradient: true,
          gradient: {
            from: "#FF9482",
            to: "#7D55FF"
          }
        },
        image: ''
      }
    },
    {
      id: '0002', name: 'Installing Nodejs V2.3.1', creator: 'njato@gmail.com',
      background: {
        isImage: true,
        color: {
          isGradient: true,
          gradient: {
            from: "#0066FF",
            to: "#FFFFFF"
          }
        },
        image: ''
      }
    },
    {
      id: '0005', name: 'Updating the Dashboard', creator: 'njato@gmail.com',
      background: {
        isImage: true,
        color: {
          isGradient: true,
          gradient: {
            from: "#0066FF",
            to: "#FFFFFF"
          }
        },
        image: ''
      }
    },
    {
      id: '0006', name: 'Download System', creator: 'njato@gmail.com',
      background: {
        isImage: true,
        color: {
          isGradient: true,
          gradient: {
            from: "#0066FF",
            to: "#FFFFFF"
          }
        },
        image: ''
      }
    }
]

export const Cards: CardType[] = [
  {
    id: '1',
    boardId: '0003',
    title: 'TODO'
  },
  {
    id: '2',
    boardId: '0003',
    title: 'DOING'
  },
  {
    id: '3',
    boardId: '0003',
    title: 'DONE'
  },
]

export const CardItems: CardItemType[] = [
  {
    id: '01',
    cardId: '1',
    index: 0,
    title: 'Customizing App',
    creation: new Date(),
    progress: 50,
    theme: 'cyan',
    users: ['njato', 'bema', 'soa', 'njiva']
  },
  {
    id: '02',
    cardId: '1',
    index: 1,
    title: 'Installing random package',
    creation: new Date(),
    progress: 50,
    theme: 'crimson',
    users: ['njato', 'bema']
  },
  {
    id: '03',
    cardId: '1',
    index: 2,
    title: 'Cleaning the disk space',
    creation: new Date(),
    progress: 50,
    theme: 'yellow',
    users: ['njato', 'bema', 'soa', 'bemena', 'lova']
  },
  {
    id: '04',
    cardId: '2',
    index: 0,
    title: 'Removing some junks files',
    creation: new Date(),
    progress: 50,
    theme: 'pink',
    users: ['njato', 'bema', 'soa']
  },
]