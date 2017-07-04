import Property from './Property';

export const DIRECTION_IN = 'DIRECTION_IN';
export const DIRECTION_OUT = 'DIRECTION_OUT';
export const DIRECTION_BOTH = 'DIRECTION_BOTH';

const ALT_DIRECTION_IN = 'IN';
const ALT_DIRECTION_OUT = 'OUT';

export default class RelationshipType {

    /**
     * Constructor
     * @param  {String} type                Reference of Relationship
     * @param  {String} relationship        Internal Neo4j Relationship type (ie 'KNOWS')
     * @param  {String} direction           Direction of Node (Use constants DIRECTION_IN, DIRECTION_OUT, DIRECTION_BOTH)
     * @param  {String|Model|null} target   Target type definition for the
     * @param  {Object} schema              Relationship definition schema
     * @return {Relationship}
     */
    constructor(type, relationship, direction, target, schema = {}) {
        this._type = type;
        this._relationship = relationship;
        this.setDirection(direction);

        this._target = target;
        this._schema = schema;

        this._properties = new Map;

        for (let key in schema) {
            const value = schema[ key ];

            // TODO:
            switch ( key ) {
                default:
                    this._properties.set(key, new Property(key, value));
                    break;
            }
        }
    }

    /**
     * Type
     *
     * @return {String}
     */
    type() {
        return this._type;
    }

    /**
     * Get Internal Relationship Type
     *
     * @return {String}
     */
    relationship() {
        return this._relationship;
    }

    /**
     * Set Direction of relationship
     *
     * @return {RelationshipType}
     */
    setDirection(direction) {
        switch (direction.toUpperCase()) {
            case DIRECTION_IN:
            case DIRECTION_OUT:
                break;

            case ALT_DIRECTION_IN:
                direction = DIRECTION_IN;
                break;


            case ALT_DIRECTION_OUT:
                direction = DIRECTION_OUT;
                break;

            default:
                direction = DIRECTION_OUT;
                break;
        }

        this._direction = direction;

        return this;
    }

    /**
     * Get Direction of Node
     *
     * @return {String}
     */
    direction() {
        return this._direction;
    }

    /**
     * Get the target node definition
     *
     * @return {Model}
     */
    target() {
        return this._target;
    }

    /**
     * Get Schema object
     *
     * @return {Object}
     */
    schema() {
        return this._schema;
    }

}