

const BookDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:5000/all-book/${id}`);
    const data = await res.json();
    console.log(data);
    return (
        <div>
            book details page
        </div>
    );
};

export default BookDetailsPage;