export const applySoftDelete = (schema) => {
    // Add soft delete fields to the schema
    schema.add({
        isDeleted: {
            type: Boolean,
            default: false,
            index: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
        deletedBy: {
            type: schema.obj?.createdBy?.type || String,
            default: null,
        },
    });

    // Exclude soft-deleted documents from all find queries
    schema.pre(/^find/, function softDeleteFilter(next) {
        const filter = this.getFilter();

        if (!filter.includeDeleted) {
            this.where({
                isDeleted: { $ne: true },
            });
        }

        // Remove the internal includeDeleted flag.
        // It is used by the plugin only and must not be part of the MongoDB query.
        const cleanedFilter = Object.fromEntries(
            Object.entries(filter).filter(
                ([key]) => key !== 'includeDeleted'
            )
        );

        this.setQuery(cleanedFilter);

        next();
    });
};