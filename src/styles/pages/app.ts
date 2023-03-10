import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center', //prevendo algo que vai acontecer no futuro, que se o usuário tiver uma tela muito grande, ou ter dado um zoom out muito longo, o conteudo sempre vai estar centralizado
    minHeight: '100vh',
})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    '@media (max-width: 665px)': {
       padding: '1rem 0'
    }
}) 