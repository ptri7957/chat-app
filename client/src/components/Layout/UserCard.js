import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

const UserCard = ({recipient}) => {
    return (
        <Card>
            <Card.Body className="profile-container">
                <div className="profile-pic">{recipient.toUpperCase()[0]}</div>
                <div className="name-container">{recipient}</div>
            </Card.Body>
        </Card>
    )
}

UserCard.propTypes = {
    recipient: PropTypes.object.isRequired,
}

export default UserCard
