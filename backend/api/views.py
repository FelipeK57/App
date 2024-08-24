from rest_framework.decorators import api_view
from rest_framework.response import Response
from tasks.models import Task
from tasks.serializer import TaskSerializer
from Tasks_List.models import List
from Tasks_List.serializer import ListSerializer
from users.models import Users
from users.serializer import UserSerializer
from django.contrib.auth.models import User

@api_view(['POST'])
def create_user(request):
    name = request.data.get('name')
    

    if not name:
        return Response ({'message': 'Name is required'})

    
    password = name
    username = name

    user = User.objects.create_user(username=username, password=password)
    user.save()


    user = Users(user=user, name=name)
    user.save()

    serializer = UserSerializer(user)

    return Response ({'message': 'User created successfully', 'user': serializer.data})


@api_view(['POST'])
def create_task(request):
    tittle = request.data.get('tittle')
    description = request.data.get('description')
    date = request.data.get('date')
    id_list = request.data.get('id_list')

    if not tittle or not description or not date:
        return Response ({'message': 'All fields are required'})

    task = Task(tittle=tittle, description=description, date=date)
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

    if not name:
        return Response ({'message': 'List name is required'})
    
    list = List(name=name)
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

@api_view(['GET'])
def get_lists(request):
    lists = List.objects.all()
    serializer = ListSerializer(lists, many=True)

    return Response ({'lists': serializer.data})


    

