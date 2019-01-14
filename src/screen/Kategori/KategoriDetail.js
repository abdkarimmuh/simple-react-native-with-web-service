import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Content,
    Button, 
    Icon, 
    Text,
    Body,
    Left,
    Form,
    Input,
    Label,
    Item,
    Title
} from 'native-base';

import Api from '../../services/api';

class KategoriDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            error: false
        }
    }

    componentDidMount = () => {
        
    }

    postKategori = (name) => {
        Api.create()
        .addKategori(name)
        .then(res => {
            this.props.navigation.navigate("Kategori")
        })
        .catch(err => {
            console.log('ERR', err)
            this.setState({
                error: true
            })
        })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress = {() =>
                                this.props.navigation.navigate("Kategori")
                            }>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.navigation.state.params.title}</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item floatingLabel>
                            <Label>Kategori</Label>
                            <Input 
                                onChangeText = { (name) => this.setState({ name }) }
                                value = { this.state.name }/>
                        </Item>
                    </Form>
                    <Body style = {{ marginTop: 32 }} >
                        <Button iconLeft primary
                            onPress = { () => this.postKategori(this.state.name) }>
                            <Icon name='checkmark' />
                            <Text>Save</Text>
                        </Button>
                    </Body>
                </Content>
            </Container>
        );
    }
}

export default KategoriDetail;