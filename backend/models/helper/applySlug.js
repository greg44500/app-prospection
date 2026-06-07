import slugify from 'slugify';

export const applySlug = (
    schema,
    {
        sourceField = 'name',
        targetField = 'slug',
    } = {}
) => {
    // Generate slug before validation so required slug fields are filled
    schema.pre('validate', function generateSlug(next) {
        if (!this.isModified(sourceField) && this[targetField]) {
            return next();
        }

        const sourceValue = this[sourceField];

        if (!sourceValue) {
            return next();
        }

        this[targetField] = slugify(sourceValue, {
            lower: true,
            strict: true,
            trim: true,
        });

        next();
    });
};