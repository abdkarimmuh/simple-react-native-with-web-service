import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Content,
    Button, 
    Text,
    Body,
    Title,
    List,
    ListItem,
    Icon,
    Right
} from 'native-base';

import Api from '../services/api';

class Kategori extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: [],
            error: false,
            isLoading: false
        }
    }

    componentDidMount = () => {
        this.getKategori();
    }

    pressAdd = () => {
        this.props.navigation.navigate("KategoriDetail", { title:"Tambah Kategori" })
    }

    getKategori = async() => {
        Api.create()
        .getKategori()
        .then(res => {
            this.setState({ data: res.data.data })
        })
        .catch(err => {
            console.log('ERR', err)
            this.setState({
                error: true
            })
        })
    }

    render() {
        const { data } = this.state;
        return (
            <Container>
                <Header noLeft>
                    <Body>
                        <Title>List Kategori</Title>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress = { () => 
                                this.pressAdd()
                            }>
                            <Icon name='add' />
                        </Button>
                        <Button
                            onPress = { () => 
                                this.getKategori()
                            }>
                            <Icon name='refresh' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List>
                    {
                        data.map((d) => (
                        <ListItem key = {d.id}>
                            <Body>
                                <Text>{d.name}</Text>
                            </Body>
                            <Right>
                                <Body style = {{ flexDirection: 'row', alignContent: 'flex-start'}}>
                                    <Button warning transparent>
                                        <Icon name='create' />
                                    </Button>
                                    <Button danger transparent>
                                        <Icon name='close' />
                                    </Button>
                                </Body>
                            </Right>
                        </ListItem>
                        ))
                    }
                    </List>
                </Content>
            </Container>
        );
    }
}

export default Kategori;