from rest_framework.decorators import api_view
from rest_framework.response import Response
from tasks.models import Task
from tasks.serializer import TaskSerializer
from Tasks_List.models import List
from Tasks_List.serializer import ListSerializer
from users.models import Users
from users.serializer import UserSerializer


@api_view(['POST'])
def create_user(request):
    name = request.data.get('name')
    

    if not name:
        return Response ({'message': 'Name is required'})
    if Users.objects.filter(name=name).exists():
        return Response ({'message': 'User already exists'})


    lista_default = List(name="Personales", emoji="👤")
    lista_default.save()


    user = Users(name=name)
    user.save()
    user.listas.add(lista_default)

    user.save()

    serializer = UserSerializer(user)

    return Response ({'message': 'User created successfully', 'user': serializer.data})


@api_view(['POST'])
def create_task(request):
    tittle = request.data.get('tittle')
    description = request.data.get('description')
    id_list = request.data.get('id_list')

    if not tittle or not description:
        return Response ({'message': 'All fields are required'})

    task = Task(tittle=tittle, description=description)
    task.save()

    if id_list:
        list = List.objects.filter(id=id_list).first()
        list.tasks.add(task)

        list.save()
    if not id_list:
        return Response ({'message': 'Task no added to list'})

    serializer = TaskSerializer(task)


    return Response ({'message': 'Task created successfully', 'task': serializer.data})

@api_view(['POST'])
def update_task(request):
    id = request.data.get('id')

    if not id:
        return Response ({'message': 'Task id is required'})
    
    task = Task.objects.filter(id=id).first()

    if not task:
        return Response ({'message': 'Task not found'})

    tittle = request.data.get('tittle')
    description = request.data.get('description')
    date = request.data.get('date')
    completed = request.data.get('completed')

    if tittle:
        task.tittle = tittle
    if description:
        task.description = description
    if date:
        task.date = date
    if completed:
        task.completed = completed
    task.save()

    serializer = TaskSerializer(task)

    return Response ({'message': 'Task updated successfully', 'task': serializer.data})

@api_view(['POST'])
def delete_task(request):
    id = request.data.get('id')

    if not id:
        return Response ({'message': 'Task id is required'})
    
    task = Task.objects.filter(id=id).first()

    if not task:
        return Response ({'message': 'Task not found'})

    task.delete()

    return Response ({'message': 'Task deleted successfully'})

@api_view(['POST'])
def create_list(request):
    name = request.data.get('name')
    emoji = request.data.get('emoji')

    if not name:
        return Response ({'message': 'List name is required'})
    
    list = List(name=name, emoji=emoji)
    list.save()

    serializer = ListSerializer(list)

    return Response ({'message': 'List created successfully', 'list': serializer.data})

@api_view(['POST'])
def update_list(request):
    id = request.data.get('id')
    name = request.data.get('name')

    if not id or not name:
        return Response ({'message': 'List id and name are required'})
    
    list = List.objects.filter(id=id).first()

    if not list:
        return Response ({'message': 'List not found'})

    list.name = name
    list.save()

    serializer = ListSerializer(list)

    return Response ({'message': 'List updated successfully', 'list': serializer.data})

@api_view(['POST'])
def delete_list(request):
    id = request.data.get('id')

    if not id:
        return Response ({'message': 'List id is required'})
    
    list = List.objects.filter(id=id).first()

    if not list:
        return Response ({'message': 'List not found'})

    list.delete()

    return Response ({'message': 'List deleted successfully'})

@api_view(['POST'])
def get_lists(request):

    id = request.data.get('id')

    if id:
        user = Users.objects.filter(id=id).first()

    lists = user.listas.all()

    serializer = ListSerializer(lists, many=True)

    return Response ({'lists': serializer.data})


    

